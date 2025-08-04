using PPGCRM.Core.Contracts.Projects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PPGCRM.Core.Contracts.Clients
{
    public class ClientInProjectDTO
    {
        public Guid ClientId { get; set; }
        public string CompanyName { get; set; }
        public string? ContactPerson { get; set; }
        public string? ClientEmail { get; set; }
        public string? ClientPhone { get; set; }
    }
}
