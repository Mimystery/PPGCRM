using PPGCRM.Core.Contracts.Project;
using PPGCRM.Core.Contracts.Projects;
using PPGCRM.Core.Contracts.Stages;
using PPGCRM.Core.Models;

namespace PPGCRM.Core.Abstractions.Stages;

public interface IStagesService
{
    Task AddStageByProjectIdAsync(Guid projectId, StageCreateDTO stageCreateDto);
    Task UpdateStageAsync(Guid stageId, StageUpdateDTO stageUpdate);
    Task DeleteStageAsync(Guid stageId);
}