using PPGCRM.Application.Identity.Authentication.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PPGCRM.Application.ExternalServices
{
    public class PasswordHasher : IPasswordHasher
    {
        public string Generate(string password)
        {
            BCrypt.Net.BCrypt.EnhancedHashPassword(password);
            return password;
        }

        public bool Verify(string password, string hashedPassword)
        {
            return BCrypt.Net.BCrypt.EnhancedVerify(password, hashedPassword);
        }
    }
}
