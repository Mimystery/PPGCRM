using PPGCRM.Core.Contracts.Processes;
using PPGCRM.Core.Models;

namespace PPGCRM.Core.Abstractions.Processes;

public interface IProcessesService
{
    Task<List<ProcessModel>> GetAllProcessesByStageIdAsync(Guid stageId);

    Task AddProcessByStageIdAsync(Guid stageId, ProcessCreateDTO processCreate);

    Task AddResponsibleUserAsync(Guid processId, Guid userId);

    Task RemoveResponsibleUserAsync(Guid processId, Guid userId);

    Task UpdateProcessAsync(Guid processId, ProcessUpdateDTO processUpdate);

    Task DeleteProcessAsync(Guid processId);
}