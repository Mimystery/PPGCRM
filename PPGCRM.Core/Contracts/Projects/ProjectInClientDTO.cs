using PPGCRM.Core.Enums;
using PPGCRM.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PPGCRM.Core.Contracts.Projects
{
    public class ProjectInClientDTO
    {
        public Guid ProjectId { get; set; }
        public string ProjectName { get; set; }
        public ProjectStatus Status { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public int Progress { get; set; }
        public bool? IsArchived { get; set; }
        public Dictionary<ProcessStatus, int> ProcessCountByStatus { get; set; } = new();
    }
}
