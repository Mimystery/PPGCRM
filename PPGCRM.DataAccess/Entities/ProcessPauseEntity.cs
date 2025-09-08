using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PPGCRM.DataAccess.Entities
{
    public class ProcessPauseEntity
    {
        public Guid PauseId { get; set; }
        public Guid ProcessId { get; set; }
        public ProcessEntity Process { get; set; }
        public DateTime? StartPauseDate { get; set; }
        public DateTime? EndPauseDate { get; set; }
    }
}
