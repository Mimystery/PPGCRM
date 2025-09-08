using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PPGCRM.Core.Models
{
    public class ProcessPauseModel
    {
        public Guid PauseId { get; set; }
        public Guid ProcessId { get; set; }
        public DateTime? StartPauseDate { get; set; }
        public DateTime? EndPauseDate { get; set; }
    }
}
