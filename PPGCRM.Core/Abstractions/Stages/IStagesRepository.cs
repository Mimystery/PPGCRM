using PPGCRM.Core.Contracts.Stages;
using PPGCRM.Core.Models;

namespace PPGCRM.Core.Abstractions.Stages;

public interface IStagesRepository
{
    Task<List<StageModel>> GetAllStagesByProjectIdAsync(Guid projectId) ;
    Task AddStageByProjectIdAsync(StageModel stage);
    Task UpdateStageAsync(Guid stageId, StageUpdateDTO stageUpdate);
    Task DeleteStageAsync(Guid stageId);
}