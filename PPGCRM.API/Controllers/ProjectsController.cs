using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using PPGCRM.Core.Abstractions;
using PPGCRM.Core.Contracts;
using PPGCRM.Core.Models;

namespace PPGCRM.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectsController : ControllerBase
    {
        private readonly IProjectsService _projectsService;
        private readonly IMapper _mapper;
        public ProjectsController(IProjectsService projectsService, IMapper mapper)
        {
            _mapper = mapper;
            _projectsService = projectsService;
        }

        [HttpGet("AllOnly")]
        public async Task<ActionResult<List<ProjectModel>>> GetAllProjectsOnlyAsync()
        {
            var projects = await _projectsService.GetAllProjectsOnlyAsync();
            return Ok(projects);
        }
        [HttpGet("ProjectOnly/{projectId}")]
        public async Task<ActionResult<ProjectModel>> GetProjectOnlyById(Guid projectId)
        {
            var project = await _projectsService.GetProjectOnlyByIdAsync(projectId);
            if (project == null)
            {
                return NotFound();
            }
            return Ok(project);
        }

        [HttpGet("AllDetails/{projectId}")]
        public async Task<ActionResult<ProjectModel>> GetAllProjectDetailsById(Guid projectId)
        {
            var project = await _projectsService.GetAllProjectDetailsById(projectId);
            if (project == null)
            {
                return NotFound();
            }
            return Ok(project);
        }

        [HttpPost("AddProject")]
        public async Task<ActionResult> AddProjectAsync([FromBody] ProjectCreateDTO projectCreateDto)
        {
            await _projectsService.AddProjectAsync(projectCreateDto);
            return Ok();
        }
    }
}
