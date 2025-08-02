using PPGCRM.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PPGCRM.DataAccess.Entities
{
    public class StageEntity
    {
        public Guid StageId { get; set; }
        public Guid ProjectId { get; set; }
        public ProjectEntity? Project { get; set; } // Navigation property for the project
        public string StageName { get; set; } = string.Empty;
        public DateTime? PlanEndDate { get; set; }  
        public List<ProcessEntity> Processes { get; set; } = new();
    }
}
