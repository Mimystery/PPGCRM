using PPGCRM.Core.Contracts.ProcessPauses;
using PPGCRM.Core.Models;

namespace PPGCRM.Application.Services;

public interface IProcessPausesService
{
    Task<List<ProcessPauseModel>> GetAllProcessPausesByProcessId(Guid processId);
    Task AddProcessPause(Guid processId);
    Task UpdateProcessPause(Guid pauseId);
    Task DeleteProcessPause(Guid pauseId);
}