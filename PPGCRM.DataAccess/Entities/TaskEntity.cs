using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices.JavaScript;
using System.Text;
using System.Threading.Tasks;

namespace PPGCRM.DataAccess.Entities
{
    public class TaskEntity
    {
        public Guid TaskId { get; set; }
        public Guid ProcessId { get; set; }
        public ProcessEntity Process { get; set; } // Navigation property for the process
        public string TaskName { get; set; }
        public DateTime CreatedAt { get; set; }
        public bool IsDone { get; set; } = false;
    }
}
