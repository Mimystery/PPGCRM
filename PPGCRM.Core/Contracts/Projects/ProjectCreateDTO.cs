using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PPGCRM.Core.Enums;

namespace PPGCRM.Core.Contracts.Project
{
    public class ProjectCreateDTO
    {
        public string ProjectName { get; set; } = string.Empty;
        public ProjectStatus Status { get; set; } = ProjectStatus.NotStarted;
    }
}
