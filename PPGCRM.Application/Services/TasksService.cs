using AutoMapper;
using PPGCRM.Core.Abstractions.Tasks;
using PPGCRM.Core.Contracts.Tasks;
using PPGCRM.Core.Models;

namespace PPGCRM.Application.Services;

public class TasksService : ITasksService
{
    private readonly IMapper _mapper;
    private readonly ITasksRepository _tasksRepository;

    public TasksService(ITasksRepository tasksRepository, IMapper mapper)
    {
        _tasksRepository = tasksRepository;
        _mapper = mapper;
    }
    public async Task<List<TaskModel>> GetAllTasksByProcessIdAsync(Guid processId)
    {
        return await _tasksRepository.GetAllTasksByProcessIdAsync(processId);
    }

    public async Task AddTaskByProcessIdAsync(Guid processId, TaskCreateDTO taskCreate)
    {
        var taskModel = new TaskModel(
            Guid.NewGuid(),
            processId,
            taskCreate.TaskName,
            taskCreate.IsDone
        );
        await _tasksRepository.AddTaskByProcessIdAsync(taskModel);
    }
    public async Task UpdateTaskAsync(Guid taskId, TaskUpdateDTO taskUpdate)
    {
        await _tasksRepository.UpdateTaskAsync(taskId, taskUpdate);
    }
    public async Task DeleteTaskAsync(Guid taskId)
    {
        await _tasksRepository.DeleteTaskAsync(taskId);
    }
}