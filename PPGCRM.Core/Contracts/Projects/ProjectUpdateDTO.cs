using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PPGCRM.Core.Enums;

namespace PPGCRM.Core.Contracts.Project
{
    public class ProjectUpdateDTO
    {
        public Guid? ClientId { get; set; } = null;
        public string? ProjectName { get; set; } = null;
        public string? Description { get; set; } = null;
        public ProjectStatus? Status { get; set; } = null;
        public DateTime? StartDate { get; set; } = null;
        public DateTime? EndDate { get; set; } = null;
        public DateTime? ConstructionWorksStart { get; set; } = null;
        public decimal? Budget { get; set; } = null;
        public decimal? Expenses { get; set; } = null;
        public int? Progress { get; set; } = null;
        public bool? IsArchived { get; set; } = null;
    }
}
