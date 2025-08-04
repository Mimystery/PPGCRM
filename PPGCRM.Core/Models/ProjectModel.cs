using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PPGCRM.Core.Enums;

namespace PPGCRM.Core.Models
{
    public class ProjectModel
    {
        public ProjectModel(Guid projectId, Guid? clientId, ClientModel client, string projectName, string? description, 
            ProjectStatus status, DateTime? startDate, DateTime? endDate,
            DateTime? constructionWorksStart, decimal? budget, decimal? expenses, 
            int progress, bool? isArchived, List<StageModel> stages)
        {
            ProjectId = projectId;
            ClientId = clientId;
            Client = client;
            ProjectName = projectName;
            Description = description;
            Status = status;
            StartDate = startDate;
            EndDate = endDate;
            ConstructionWorksStart = constructionWorksStart;
            Budget = budget;
            Expenses = expenses;
            Progress = progress;
            IsArchived = isArchived;
            Stages = stages?.AsReadOnly() ?? new List<StageModel>().AsReadOnly();
        }

        public Guid ProjectId { get; }
        public Guid? ClientId { get; }
        public ClientModel? Client { get; }
        public string ProjectName { get; }
        public string? Description { get; }
        public ProjectStatus Status { get; }
        public DateTime? StartDate { get; }
        public DateTime? EndDate { get; }
        public DateTime? ConstructionWorksStart { get; }
        public decimal? Budget { get; }
        public decimal? Expenses { get; }
        public int Progress { get; } = 0; // Percentage from 0 to 100
        public bool? IsArchived { get; } = false;
        public IReadOnlyList<StageModel> Stages { get; }
    }
}

