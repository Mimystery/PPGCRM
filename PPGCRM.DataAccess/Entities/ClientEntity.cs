using PPGCRM.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PPGCRM.DataAccess.Entities
{
    public class ClientEntity
    {
        public Guid ClientId { get; set; }
        public string CompanyName { get; set; }
        public string? Director { get; set; }
        public string? ContactPerson { get; set; }
        public string? ClientEmail { get; set; }
        public string? ClientPhone { get; set; }
        public List<ProjectEntity> Projects { get; set; }
    }
}
