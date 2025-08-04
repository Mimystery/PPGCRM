using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PPGCRM.Core.Enums;

namespace PPGCRM.Core.Contracts
{
    public class ProjectUpdateDTO
    {
        public Guid ProjectId { get; set; }
        public Guid? ClientId { get; set; }
        public string? ProjectName { get; set; }
        public string? Description { get; set; }
        public ProjectStatus? Status { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public DateTime? ConstructionWorksStart { get; set; }
        public decimal? Budget { get; set; }
        public decimal? Expenses { get; set; }
        public int? Progress { get; set; }
        public bool? IsArchived { get; set; } = false;
    }
}
