using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PPGCRM.Core.Abstractions.Processes;
using PPGCRM.Core.Contracts.Processes;
using PPGCRM.Core.Models;

namespace PPGCRM.API.Controllers;

//[Authorize]
[ApiController]
[Route("api/[controller]")]
public class ProcessesController : ControllerBase
{
    private readonly IMapper _mapper;
    private readonly IProcessesService _processesService;

    public ProcessesController(IProcessesService processesService, IMapper mapper)
    {
        _processesService = processesService;
        _mapper = mapper;  
    }

    [HttpGet("GetAllProcessesByStageId/{stageId}")]
    public async Task<ActionResult<List<ProcessModel>>> GetAllProcessesByStageId(Guid stageId)
    {
        var processes = await _processesService.GetAllProcessesByStageIdAsync(stageId);
        return Ok(processes);
    }

    [HttpGet("GetProcessById/{processId}")]
    public async Task<ActionResult<ProcessModel>> GetProcessById(Guid processId)
    {
        var process = await _processesService.GetProcessById(processId);
        return Ok(process);
    }

    [HttpPost("AddProcessByStageId/{stageId}")]
    public async Task<ActionResult> AddProcessByStageId(Guid stageId, [FromBody] ProcessCreateDTO processCreateDto)
    {
        if (processCreateDto == null)
        {
            return BadRequest("Process data is required.");
        }

        await _processesService.AddProcessByStageIdAsync(stageId, processCreateDto);
        return Ok();
    }

    [HttpPost("AddResponsibleUser/{processId}/{userId}")]
    public async Task<ActionResult> AddResponsibleUser(Guid processId, Guid userId)
    {
        await _processesService.AddResponsibleUserAsync(processId, userId);
        return Ok();
    }
        
    [HttpDelete("RemoveResponsibleUser/{processId}/{userId}")]
    public async Task<ActionResult> RemoveResponsibleUser(Guid processId, Guid userId)
    {
        await _processesService.RemoveResponsibleUserAsync(processId, userId);
        return Ok();
    }

    [HttpPut("UpdateProcess/{processId}")]
    public async Task<ActionResult> UpdateProcess(Guid processId, [FromBody] ProcessUpdateDTO processUpdateDto)
    {
        if (processUpdateDto == null)
        {
            return BadRequest("Process update data is required.");
        }

        await _processesService.UpdateProcessAsync(processId, processUpdateDto);
        return Ok();
    }

    [HttpDelete("DeleteProcess/{processId}")]
    public async Task<ActionResult> DeleteProcess(Guid processId)
    {
        await _processesService.DeleteProcessAsync(processId);
        return Ok();
    }
}
