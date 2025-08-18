using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PPGCRM.Core.Models
{
    public class StageModel
    {
        public StageModel(Guid stageId, Guid projectId, string stageName, DateTime? planEndDate, List<ProcessModel> processes)
        {
            StageId = stageId;
            ProjectId = projectId;
            StageName = stageName;
            PlanEndDate = planEndDate;
            Processes = processes.AsReadOnly() ?? new List<ProcessModel>().AsReadOnly();
        }

        public Guid StageId { get; }
        public Guid ProjectId { get; }
        public string StageName { get; }
        public DateTime? PlanEndDate { get; }
        public IReadOnlyList<ProcessModel> Processes { get; }
    }
}
