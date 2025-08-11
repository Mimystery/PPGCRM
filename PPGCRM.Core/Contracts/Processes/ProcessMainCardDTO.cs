using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PPGCRM.Core.Contracts.Users;
using PPGCRM.Core.Models;

namespace PPGCRM.Core.Contracts.Processes
{
    public class ProcessMainCardDTO
    {
        public Guid ProcessId { get; set; }
        public Guid StageId { get; set; }
        public string ProcessName { get; set; }
        public DateTime? PlanEndDate { get; set; }
        public string? Notes { get; set; }
        public int SortOrder { get; set; }
        public string Status { get; set; } // e.g., "In Progress", "Completed", "On Hold"
        public int Progress { get; set; } // Percentage from 0 to 100
        public List<UserSmallCardDTO> ResponsibleUsers { get; set; }
    }
}
