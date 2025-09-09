using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using PPGCRM.Application.Services;
using PPGCRM.Core.Contracts.ProcessPauses;

namespace PPGCRM.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProcessPausesController : ControllerBase
    {
        private readonly IProcessPausesService _processPausesService;
        private readonly IMapper _mapper;

        public ProcessPausesController(IProcessPausesService processPausesService, IMapper mapper)
        {
            _processPausesService = processPausesService;
            _mapper = mapper;
        }

        [HttpGet("GetAllProcessPausesByProcessId/{processId}")]
        public async Task<ActionResult> GetAllProcessPausesByProcessId(Guid processId)
        {
            var pauses = await _processPausesService.GetAllProcessPausesByProcessId(processId);
            return Ok(pauses);
        }

        [HttpPost("AddProcessPause/{processId}")]
        public async Task<ActionResult> AddProcessPause(Guid processId)
        {
            await _processPausesService.AddProcessPause(processId);
            return Ok();
        }

        [HttpPut("UpdateProcessPause/{pauseId}")]
        public async Task<ActionResult> UpdateProcessPause(Guid pauseId, [FromBody] ProcessPauseUpdateDTO processPauseUpdateDto)
        {
            await _processPausesService.UpdateProcessPause(pauseId, processPauseUpdateDto);
            return Ok();
        }

        [HttpDelete("DeleteProcessPause/{pauseId}")]
        public async Task<ActionResult> DeleteProcessPause(Guid pauseId)
        {
            await _processPausesService.DeleteProcessPause(pauseId);
            return Ok();
        }
    }
}
