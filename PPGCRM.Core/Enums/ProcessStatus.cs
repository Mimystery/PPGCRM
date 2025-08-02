using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PPGCRM.Core.Enums
{
    public enum ProcessStatus
    {
        ToDo,        // Process is yet to be started
        InProgress,  // Process is currently being worked on
        Paused,      // Process is paused temporarily
        Expired,     // Process has exceeded its planned end date
        Done,   // Process has been completed successfully
    }
}
