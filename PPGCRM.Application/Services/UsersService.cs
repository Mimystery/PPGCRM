using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PPGCRM.Application.Identity.Authentication.Interfaces;
using PPGCRM.Core.Contracts.Users;
using PPGCRM.Core.Enums;
using PPGCRM.Core.Models;
using PPGCRM.DataAccess.Repositories;

namespace PPGCRM.Application.Services
{
    public class UsersService
    {
        private readonly IPasswordHasher _passwordHasher;
        private readonly IPendingUsersRepository _pendingUsersRepository;
        private readonly IUsersRepository _usersRepository;

        public UsersService(IPendingUsersRepository pendingUsersRepository, IUsersRepository usersRepository,
            IPasswordHasher passwordHasher)
        {
            _pendingUsersRepository = pendingUsersRepository;
            _passwordHasher = passwordHasher;
            _usersRepository = usersRepository;
        }

        public async Task RegisterByAdmin(UserCreateByAdminDTO userCreateByAdminDto)
        {
            string registrationCode = Guid.NewGuid().ToString("N");

            var pendingUser = new PendingUserModel(Guid.NewGuid(), userCreateByAdminDto.FirstName,
                userCreateByAdminDto.LastName, userCreateByAdminDto.Role, userCreateByAdminDto.Salary,
                registrationCode, false);

            await _pendingUsersRepository.AddPendingUserAsync(pendingUser);
        }

        public async Task RegisterByUser(UserCreateByEmployeeDTO userCreateByEmployeeDto, string registrationCode)
        {
            var pendingUser = await _pendingUsersRepository.GetPendingUserByRegistrationCodeAsync(registrationCode);
            var hashedPassword = _passwordHasher.Generate(userCreateByEmployeeDto.Password);

            var userModel = new UserModel(pendingUser.UserId, null, hashedPassword, pendingUser.FirstName,
                pendingUser.LastName, userCreateByEmployeeDto.Email, null, pendingUser.Role, pendingUser.Salary);

            await _usersRepository.AddUserAsync(userModel);
            await _pendingUsersRepository.DeletePendingUserAsync(pendingUser.UserId);
        }

        public async Task<string> Login(UserLoginDTO userLoginDto)
        {
            var user = await _usersRepository.GetUserByEmailAsync(userLoginDto.Email);
            if (user == null || !_passwordHasher.Verify(userLoginDto.Password, user.PasswordHash))
            {
                throw new UnauthorizedAccessException("Invalid email or password.");
            }
            //return user.UserId.ToString(); // Return user ID or token as needed
        }
    }
}
