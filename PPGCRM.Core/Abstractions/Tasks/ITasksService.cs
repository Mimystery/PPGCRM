using PPGCRM.Core.Contracts.Tasks;
using PPGCRM.Core.Models;

namespace PPGCRM.Core.Abstractions.Tasks;

public interface ITasksService
{
    Task<List<TaskModel>> GetAllTasksByProcessIdAsync(Guid processId);

    Task<TaskModel> AddTaskByProcessIdAsync(Guid processId, TaskCreateDTO taskCreate);

    Task UpdateTaskAsync(Guid taskId, TaskUpdateDTO taskUpdate);

    Task DeleteTaskAsync(Guid taskId);
}