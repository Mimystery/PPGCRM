using PPGCRM.Core.Contracts.ProcessPauses;
using PPGCRM.Core.Models;

namespace PPGCRM.DataAccess.Repositories;

public interface IProcessPausesRepository
{
    Task<List<ProcessPauseModel>> GetAllProcessPausesByProcessId(Guid processId);
    Task AddProcessPause(ProcessPauseModel pauseModel);
    Task UpdateProcessPause(Guid pauseId);
    Task DeleteProcessPause(Guid pauseId);
}