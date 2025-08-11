using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PPGCRM.Core.Contracts.Processes;

namespace PPGCRM.Core.Contracts.Users
{
    public class UserDetailsDTO
    {
        public Guid UserId { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Role { get; set; } // e.g., "Admin", "GIP", "Employee"
        public decimal Salary { get; set; }
    }
}
