using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PPGCRM.Application.Authentication.Interfaces;
using PPGCRM.Core.Contracts.Users;
using PPGCRM.Core.Enums;
using PPGCRM.Core.Models;

namespace PPGCRM.Application.Services
{
    public class UsersService
    {
        private readonly IPasswordHasher _passwordHasher;

        public UsersService(IPasswordHasher passwordHasher)
        {
            _passwordHasher = passwordHasher;
        }

        public async Task RegisterByAdmin(UserCreateByAdminDTO userCreateByAdminDto)
        {
            string registrationCode = Guid.NewGuid().ToString("N");

            var pendingUser = new PendingUserModel(Guid.NewGuid(), userCreateByAdminDto.FirstName,
                userCreateByAdminDto.LastName, userCreateByAdminDto.Role, userCreateByAdminDto.Salary,
                registrationCode, false);
        }

        public async Task RegisterByUser(string email, string password)
        {
            var hashedPassword = _passwordHasher.Generate(password);
        }
    }
}
