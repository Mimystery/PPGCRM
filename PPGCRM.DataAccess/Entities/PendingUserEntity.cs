using PPGCRM.Core.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PPGCRM.DataAccess.Entities
{
    public class PendingUserEntity
    {
        public Guid UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Role { get; set; } // e.g., "Admin", "GIP", "Employee"
        public decimal? Salary { get; set; }
        public string RegistrationCode { get; set; }
        public bool isRegistered { get; set; } = false;
    }
}
