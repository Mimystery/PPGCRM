using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PPGCRM.Core.Abstractions.Tasks;
using PPGCRM.Core.Contracts.Tasks;
using PPGCRM.Core.Models;
using PPGCRM.DataAccess.Entities;

namespace PPGCRM.DataAccess.Repositories;

public class TasksRepository : ITasksRepository
{
    private readonly CRMDbContext _context;
    private readonly IMapper _mapper;

    public TasksRepository(CRMDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }
    public async Task<List<TaskModel>> GetAllTasksByProcessIdAsync(Guid processId)
    {
        var tasks = await _context.Tasks
            .Where(t => t.ProcessId == processId)
            .ToListAsync();
            
        return _mapper.Map<List<TaskModel>>(tasks);
    }
    public async Task AddTaskByProcessIdAsync(TaskModel task)
    {
        var taskEntity = _mapper.Map<TaskEntity>(task);
        _context.Tasks.Add(taskEntity);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateTaskAsync(Guid taskId, TaskUpdateDTO taskUpdate)
    {
        var taskEntity = await _context.Tasks.FirstOrDefaultAsync(t => t.TaskId == taskId);
        if (taskEntity == null)
        {
            throw new KeyNotFoundException($"Task with ID {taskId} NOT FOUND.");
        }

        if (taskUpdate.TaskName != null)
        {
            taskEntity.TaskName = taskUpdate.TaskName;
        }

        if (taskUpdate.IsDone != null)
        {
            taskEntity.IsDone = taskUpdate.IsDone;
        }
        await _context.SaveChangesAsync();
    }
    public async Task DeleteTaskAsync(Guid taskId)
    {
        // Еслі нам не нада CascadeDelete метод Delete можна писати в 1 строку:

        //var taskEntity = await _context.Tasks.FirstOrDefaultAsync(t => t.TaskId == taskId);
        //if (taskEntity == null)
        //{
        //    throw new KeyNotFoundException($"Task with provided Id {taskId} not found");
        //}

        //_context.Tasks.Remove(taskEntity);
        //await _context.SaveChangesAsync();
        await _context.Tasks.Where(t => t.TaskId == taskId).ExecuteDeleteAsync();
    }
}