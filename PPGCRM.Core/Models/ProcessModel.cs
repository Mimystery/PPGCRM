using PPGCRM.Core.Contracts.Users;
using PPGCRM.Core.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PPGCRM.Core.Models
{
    public class ProcessModel
    {
        public ProcessModel(
            Guid processId,
            Guid stageId,
            string processName,
            DateTime? startDate,
            DateTime? planEndDate,
            DateTime? factEndDate,
            string? notes,
            string? notDoneReasons,
            string? problems,
            int? sortOrder,
            ProcessStatus? status, // e.g., "In Progress", "Completed", "On Hold"
            int? progress, // Percentage from 0 to 100
            decimal? totalProcessCost,
            DateTime createdAt,
            List<TaskModel>? tasks, 
            List<UserMainCardDTO>? responsibleUsers,
            List<ProcessPauseModel>? processPauses,
            List<ProcessFileModel>? processFiles) 
        {
            ProcessId = processId;
            StageId = stageId;
            ProcessName = processName;
            StartDate = startDate;
            PlanEndDate = planEndDate;
            FactEndDate = factEndDate;
            Notes = notes;
            NotDoneReasons = notDoneReasons;
            Problems = problems;
            SortOrder = sortOrder;
            Status = status;
            Progress = progress;
            TotalProcessCost = totalProcessCost;
            CreatedAt = createdAt;
            Tasks = tasks?.AsReadOnly() ?? new List<TaskModel>().AsReadOnly();
            ResponsibleUsers = responsibleUsers?.AsReadOnly() ?? new List<UserMainCardDTO>().AsReadOnly();
            ProcessPauses = processPauses?.AsReadOnly() ?? new List<ProcessPauseModel>().AsReadOnly();
            ProcessFiles = processFiles?.AsReadOnly() ?? new List<ProcessFileModel>().AsReadOnly();
        }

        public Guid ProcessId { get; }
        public Guid StageId { get; }
        public string ProcessName { get; }
        public DateTime? StartDate { get; }
        public DateTime? PlanEndDate { get; }
        public DateTime? FactEndDate { get; }
        public string? Notes { get; }
        public string? NotDoneReasons { get; }
        public string? Problems { get; }
        public int? SortOrder { get; }
        public ProcessStatus? Status { get; } // e.g., "In Progress", "Completed", "On Hold"
        public int? Progress { get; } // Percentage from 0 to 100
        public decimal? TotalProcessCost { get; }
        public DateTime CreatedAt { get; }
        public IReadOnlyList<TaskModel>? Tasks { get; }
        public IReadOnlyList<UserMainCardDTO>? ResponsibleUsers { get; }
        public IReadOnlyList<ProcessPauseModel> ProcessPauses { get; }
        public IReadOnlyList<ProcessFileModel> ProcessFiles { get; }
    }
}
