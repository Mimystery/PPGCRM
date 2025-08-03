using PPGCRM.Core.Enums;
using PPGCRM.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PPGCRM.DataAccess.Entities
{
    public class ProcessEntity
    {
        public Guid ProcessId { get; set; }
        public Guid StageId { get; set; }
        public StageEntity Stage { get; set; } // Navigation property for the stage
        public string ProcessName { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? PlanEndDate { get; set; }
        public DateTime? FactEndDate { get; set; }
        public string? Notes { get; set; }
        public string? NotDoneReasons { get; set; }
        public string? Problems { get; set; }
        public int SortOrder { get; set; }
        public string Status { get; set; } // e.g., "In Progress", "Completed", "On Hold"
        public int Progress { get; set; } // Percentage from 0 to 100
        public decimal TotalProcessCost { get; set; } = 0;
        public List<TaskEntity> Tasks { get; set; }
        public List<UserEntity> ResponsibleUsers { get; set; }
    }
}
