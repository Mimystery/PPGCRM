using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PPGCRM.Core.Abstractions.Stages;
using PPGCRM.Core.Contracts.Stages;
using PPGCRM.Core.Models;

namespace PPGCRM.API.Controllers;

 [Authorize] 
 [ApiController] 
 [Route("api/[controller]")]
public class StagesController : ControllerBase
{
    private readonly IMapper _mapper;
    private readonly IStagesService _stagesService;

    public StagesController(IStagesService stagesService, IMapper mapper)
   {
      _stagesService = stagesService;
      _mapper = mapper;
   }
    
    [HttpGet("GetAllStagesByProjectId/{projectId}")]
    public async Task <ActionResult<List<StageModel>>> GetAllStagesByProjectId(Guid projectId)
    {
        var stages = await _stagesService.GetAllStagesByProjectIdAsync(projectId);
        return Ok(stages);
    }

    [HttpPost("AddStageByProjectId/{projectId}")]
    public async Task<ActionResult> AddStageByProjectId(Guid projectId, [FromBody] StageCreateDTO stageCreateDto)
    {
        if (stageCreateDto == null)
        {
            return BadRequest("Stage data is required.");
        }

        await _stagesService.AddStageByProjectIdAsync(projectId, stageCreateDto);
        return Ok();
    }
    
    [HttpPut("UpdateStageByProjectId/{projectId}")]
    public async Task<ActionResult> UpdateStageByProjectId(Guid stageId, [FromBody] StageUpdateDTO stageUpdate)
    {
        if (stageUpdate == null)
        {
            return BadRequest("Stage update data is required.");
        }

        await _stagesService.UpdateStageAsync(stageId, stageUpdate);
        return Ok();
    }

    [HttpDelete("DeleteStageById/{stageId}")]
    public async Task<ActionResult> DeleteStageById(Guid stageId)
    {
        await _stagesService.DeleteStageAsync(stageId);
        return Ok();
    }
    
}