using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PPGCRM.Core.Models
{
    public class ClientModel
    {
        public ClientModel(Guid clientId, string companyName, string? director, string? contactPerson, string? clientEmail, string? clientPhone, List<ProjectModel> projects)
        {
            ClientId = clientId;
            CompanyName = companyName;
            Director = director;
            ContactPerson = contactPerson;
            ClientEmail = clientEmail;
            ClientPhone = clientPhone;
            Projects = projects?.AsReadOnly() ?? new List<ProjectModel>().AsReadOnly();
        }

        public Guid ClientId { get; }
        public string CompanyName { get; }
        public string? Director { get; }
        public string? ContactPerson { get; }
        public string? ClientEmail { get; }
        public string? ClientPhone { get; }
        public IReadOnlyList<ProjectModel> Projects { get; }
    }
}
