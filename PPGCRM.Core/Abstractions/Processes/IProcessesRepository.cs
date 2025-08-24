using PPGCRM.Core.Contracts.Processes;
using PPGCRM.Core.Models;

namespace PPGCRM.Core.Abstractions.Processes;

public interface IProcessesRepository
{
    Task<List<ProcessModel>> GetAllProcessesByStageIdAsync(Guid stageId);
    Task<ProcessModel> GetProcessById(Guid processId);
    Task AddProcessByStageIdAsync(ProcessModel process);
    Task AddResponsibleUserAsync(Guid processId, Guid userId);
    Task RemoveResponsibleUserAsync(Guid processId, Guid userId);
    Task UpdateProcessAsync(Guid processId, ProcessUpdateDTO processUpdate);
    Task DeleteProcessAsync(Guid processId);
}