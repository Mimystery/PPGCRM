using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PPGCRM.Application.Identity.Authentication.Interfaces;
using PPGCRM.Core.Contracts.Processes;
using PPGCRM.Core.Contracts.Users;
using PPGCRM.Core.Enums;
using PPGCRM.Core.Models;
using PPGCRM.DataAccess.Repositories;

namespace PPGCRM.Application.Services
{
    public class UsersService : IUsersService
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

        public async Task<List<UserMainCardDTO>> GetAllUsersAsync()
        {
            return await _usersRepository.GetAllUsersAsync();
        }

        public async Task<UserDetailsDTO> GetUserDetailsByIdAsync(Guid userId)
        {
            return await _usersRepository.GetUserDetailsByIdAsync(userId);
        }

        public async Task<UserModel?> GetUserByEmailAsync(string email)
        {
            return await _usersRepository.GetUserByEmailAsync(email);
        }

        public async Task<List<ProcessMainCardDTO>> GetUserProcessesAsync(Guid userId, Guid? projectId, Guid? stageId)
        {
            return await _usersRepository.GetUserProcessesAsync(userId, projectId, stageId);
        }

        public async Task AddUserAsync(UserModel user)
        {
            await _usersRepository.AddUserAsync(user);
        }

        public async Task UpdateUserAsync(Guid userId, UserUpdateDTO userUpdateDto)
        {
            await _usersRepository.UpdateUserAsync(userId, userUpdateDto);
        }

        public async Task DeleteUserAsync(Guid userId)
        {
            await _usersRepository.DeleteUserAsync(userId);
        }
    }
}
