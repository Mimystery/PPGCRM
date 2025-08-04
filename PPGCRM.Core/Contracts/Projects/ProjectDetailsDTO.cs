using PPGCRM.Core.Contracts.Clients;
using PPGCRM.Core.Enums;
using PPGCRM.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PPGCRM.Core.Contracts.Projects
{
    public class ProjectDetailsDTO
    {
        public Guid ProjectId { get; set; }
        public Guid? ClientId { get; set; }
        public ClientInProjectDTO? Client { get; set; }
        public string ProjectName { get; set; }
        public string? Description { get; set; }
        public ProjectStatus Status { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public DateTime? ConstructionWorksStart { get; set; }
        public decimal? Budget { get; set; }
        public decimal? Expenses { get; set; }
        public int Progress { get; set; }
        public bool? IsArchived { get; set; }
        public IReadOnlyList<StageModel> Stages { get; set; }
    }
}
