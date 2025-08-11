using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PPGCRM.Core.Enums;

namespace PPGCRM.DataAccess.Entities
{
    public class ProjectEntity
    {
        public Guid ProjectId { get; set; }
        public Guid? ClientId { get; set; }
        public ClientEntity? Client { get; set; } // Navigation property for the client
        public string ProjectName { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string? Status { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public DateTime? ConstructionWorksStart { get; set; }
        public decimal? Budget { get; set; } 
        public decimal? Expenses { get; set; }
        public bool? IsArchived { get; set; } = false;
        public List<StageEntity> Stages { get; set; } = new();
    }
}
