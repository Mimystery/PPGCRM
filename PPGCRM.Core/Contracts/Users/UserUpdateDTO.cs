using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PPGCRM.Core.Contracts.Users
{
    public class UserUpdateDTO
    {
        public string? UserName { get; set; }
        public string? PasswordHash { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public string? Role { get; set; } // e.g., "Admin", "GIP", "Employee"
        public decimal? Salary { get; set; }
    }
}
