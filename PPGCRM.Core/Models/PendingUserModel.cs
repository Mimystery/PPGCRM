using PPGCRM.Core.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PPGCRM.Core.Models
{
    public class PendingUserModel
    {

        public PendingUserModel(Guid userId, string firstName, string lastName, Role role, decimal? salary, string registrationCode, bool isRegistered)
        {
            UserId = userId;
            FirstName = firstName;
            LastName = lastName;
            Role = role;
            Salary = salary;
            RegistrationCode = registrationCode;
            this.isRegistered = isRegistered;
        }

        public Guid UserId { get; }
        public string FirstName { get; }
        public string LastName { get; }
        public Role Role { get; } // e.g., "Admin", "GIP", "Employee"
        public decimal? Salary { get; }
        public string RegistrationCode { get; }
        public bool isRegistered { get; }

    }
}
