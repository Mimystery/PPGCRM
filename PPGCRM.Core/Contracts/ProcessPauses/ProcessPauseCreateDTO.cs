using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PPGCRM.Core.Contracts.ProcessPauses
{
    public class ProcessPauseCreateDTO
    {
        public DateTime? StartPauseDate { get; set; }
        public DateTime? EndPauseDate { get; set; }
    }
}
