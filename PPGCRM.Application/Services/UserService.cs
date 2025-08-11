using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PPGCRM.Application.Authentication.Interfaces;
using PPGCRM.Core.Enums;

namespace PPGCRM.Application.Services
{
    public class UserService
    {
        private readonly IPasswordHasher _passwordHasher;

        public UserService(IPasswordHasher passwordHasher)
        {
            _passwordHasher = passwordHasher;
        }

        public async Task RegisterByAdmin(string firstName, string lastName, decimal salary, Role role)
        {
            
        }

        public async Task RegisterByUser(string email, string password)
        {
            var hashedPassword = _passwordHasher.Generate(password);
        }
    }
}
