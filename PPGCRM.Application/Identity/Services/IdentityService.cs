using PPGCRM.Application.Identity.Authentication.Interfaces;
using PPGCRM.Core.Contracts.Users;
using PPGCRM.Core.Models;
using PPGCRM.DataAccess.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using PPGCRM.Application.Identity.Authentication.AuthContracts;
using PPGCRM.Application.Services;

namespace PPGCRM.Application.Identity.Services
{
    public class IdentityService : IIdentityService
    {

        private readonly IPasswordHasher _passwordHasher;
        private readonly IPendingUsersRepository _pendingUsersRepository;
        private readonly IUsersService _usersService;
        private readonly IJwtProvider _jwtProvider;

        public IdentityService(IPendingUsersRepository pendingUsersRepository, IUsersService usersService,
            IPasswordHasher passwordHasher, IJwtProvider jwtProvider)
        {
            _pendingUsersRepository = pendingUsersRepository;
            _passwordHasher = passwordHasher;
            _usersService = usersService;
            _jwtProvider = jwtProvider;

        }
        public async Task<string> RegisterByAdmin(UserCreateByAdminDTO userCreateByAdminDto)
        {
            string registrationCode = Guid.NewGuid().ToString("N");

            var pendingUser = new PendingUserModel(Guid.NewGuid(), userCreateByAdminDto.FirstName,
                userCreateByAdminDto.LastName, userCreateByAdminDto.Role, userCreateByAdminDto.Salary,
                registrationCode, false);

            await _pendingUsersRepository.AddPendingUserAsync(pendingUser);
            return registrationCode;
        }

        public async Task RegisterByUser(UserCreateByEmployeeDTO userCreateByEmployeeDto, string registrationCode)
        {
            var pendingUser = await _pendingUsersRepository.GetPendingUserByRegistrationCodeAsync(registrationCode);
            var hashedPassword = _passwordHasher.Generate(userCreateByEmployeeDto.Password);

            var userModel = new UserModel(pendingUser.UserId, null, hashedPassword, pendingUser.FirstName,
                pendingUser.LastName, userCreateByEmployeeDto.Email, null, pendingUser.Role, pendingUser.Salary);

            await _usersService.AddUserAsync(userModel);
            await _pendingUsersRepository.DeletePendingUserAsync(pendingUser.UserId);
        }

        public async Task CheckPendingUserExistingByRegistrationCode(string regCode)
        {
            var pendingUser = await _pendingUsersRepository.GetPendingUserByRegistrationCodeAsync(regCode);
        }

        public async Task<TokenDTO> Login(UserLoginDTO userLoginDto)
        {
            var user = await _usersService.GetUserByEmailAsync(userLoginDto.Email);
            if (user.PasswordHash == null)
            {
                throw new Exception("Password null");
            }
            if (!_passwordHasher.Verify(userLoginDto.Password, user.PasswordHash))
            {
                throw new UnauthorizedAccessException("Invalid email or password.");
            }

            var token = _jwtProvider.GenerateToken(user);
            return new TokenDTO
            {
                AccessToken = token,
                RefreshToken = "dummy_refresh_token", // Replace with actual refresh token logic

            };
        }

        public async Task<TokenDTO> RefreshToken(string refreshToken)
        {
            // Here you would typically validate the refresh token and issue a new access token
            // For simplicity, we are returning a dummy token
            return new TokenDTO
            {
                AccessToken = "new_access_token",
                RefreshToken = "new_refresh_token",
            };
        }

    }
}
