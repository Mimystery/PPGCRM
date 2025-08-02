using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PPGCRM.Core.Models
{
    public class TaskModel
    {
        public TaskModel(Guid taskId, Guid processId, string taskName, bool isDone)
        {
            TaskId = taskId;
            ProcessId = processId;
            TaskName = taskName;
            IsDone = isDone;
        }

        public Guid TaskId { get; }
        public Guid ProcessId { get; }
        public string TaskName { get; }
        public bool IsDone { get; } = false;
    }
}
