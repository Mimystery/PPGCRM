using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PPGCRM.Core.Abstractions.Tasks;
using PPGCRM.Core.Contracts.Tasks;
using PPGCRM.Core.Models;

namespace PPGCRM.API.Controllers;

//[Authorize]
[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
    private readonly ITasksService _tasksService;
    private readonly IMapper _mapper;

    public TasksController(ITasksService tasksService, IMapper mapper)
    {
        _tasksService = tasksService;
        _mapper = mapper;
    }

    [HttpGet("GetAllTasksByProcessId/{processId}")]
    public async Task<ActionResult<List<TaskModel>>> GetAllTasksByProcessId(Guid processId)
    {
        var tasks = await _tasksService.GetAllTasksByProcessIdAsync(processId);
        return Ok(tasks);
    }
    
    [HttpPost("AddTaskByProcessId/{processId}")]
    public async Task<ActionResult<TaskModel>> AddTaskByProcessId(Guid processId, [FromBody] TaskCreateDTO taskCreate)
    {
        if (taskCreate == null)
        {
            return BadRequest("Task data is required.");
        }

        var task = await _tasksService.AddTaskByProcessIdAsync(processId, taskCreate);
        return Ok(task);
    }

    [HttpPut("UpdateTaskById/{taskId}")]
    public async Task<ActionResult> UpdateTaskById(Guid taskId, [FromBody]TaskUpdateDTO taskUpdate)
    {
        if (taskUpdate == null)
        {
            return BadRequest("Task data is required.");
        }
        await _tasksService.UpdateTaskAsync(taskId, taskUpdate);
        return Ok();
    }

    [HttpDelete("DeleteTaskById/{taskId}")]
    public async Task<ActionResult> DeleteTaskById(Guid taskId)
    {
        await _tasksService.DeleteTaskAsync(taskId);
        return Ok();
    }
}