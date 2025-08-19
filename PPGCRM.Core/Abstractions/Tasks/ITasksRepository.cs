using PPGCRM.Core.Contracts.Tasks;
using PPGCRM.Core.Models;

namespace PPGCRM.Core.Abstractions.Tasks;

public interface ITasksRepository
{
    Task<List<TaskModel>> GetAllTasksByProcessIdAsync(Guid processId);

    Task AddTaskByProcessIdAsync(TaskModel task);

    Task UpdateTaskAsync(Guid taskId, TaskUpdateDTO taskUpdate);

    Task DeleteTaskAsync(Guid taskId);
}