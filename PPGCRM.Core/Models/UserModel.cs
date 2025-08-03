using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PPGCRM.Core.Models
{
    public class UserModel
    {
        public UserModel(Guid userId, string userName, string password, string firstName, string lastName, string? email, string? phone, decimal salary)
        {
            UserId = userId;
            UserName = userName;
            PasswordHash = password;
            FirstName = firstName;
            LastName = lastName;
            Email = email;
            Phone = phone;
            Salary = salary;
        }
        public Guid UserId { get; }
        public string UserName { get; }
        public string PasswordHash { get; }
        public string FirstName { get; }
        public string LastName { get; }
        public string Email { get; }
        public string Phone { get; }
        //public string Role { get; } // e.g., "Admin", "GIP", "Employee"
        public decimal Salary { get; }
    }
}
