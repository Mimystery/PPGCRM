using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using PPGCRM.Core.Abstractions.Projects;
using PPGCRM.Core.Contracts.Project;
using PPGCRM.Core.Contracts.Projects;
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

        [HttpGet("AllProjectsOnly")]
        public async Task<ActionResult<List<ProjectModel>>> GetAllProjectsOnly()
        {
            var projects = await _projectsService.GetAllProjectsOnlyAsync();
            return Ok(projects);
        }
        [HttpGet("AllProjectMainData")]
        public async Task<ActionResult<List<ProjectMainDTO>>> GetAllProjectMainData()
        {
            var projects = await _projectsService.GetAllProjectMainDataAsync();
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

        [HttpGet("AllProjectDetails/{projectId}")]
        public async Task<ActionResult<ProjectDetailsDTO>> GetAllProjectDetailsById(Guid projectId)
        {
            var project = await _projectsService.GetAllProjectDetailsById(projectId);
            if (project == null)
            {
                return NotFound();
            }

            return Ok(project);
        }

        [HttpPost("AddProject")]
        public async Task<ActionResult> AddProject([FromBody] ProjectCreateDTO projectCreateDto)
        {
            await _projectsService.AddProjectAsync(projectCreateDto);
            return Ok();
        }

        [HttpPut("UpdateProject/{projectId}")]
        public async Task<ActionResult> UpdateProject(Guid projectId, [FromBody] ProjectUpdateDTO projectUpdateDto)
        {
            await _projectsService.UpdateProjectAsync(projectId, projectUpdateDto);
            return Ok();
        }

        [HttpDelete("DeleteProject/{projectId}")]
        public async Task<ActionResult> DeleteProject(Guid projectId)
        {
            await _projectsService.DeleteProjectAsync(projectId);
            return Ok();
        }
    }
}
