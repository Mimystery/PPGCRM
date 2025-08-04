using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using PPGCRM.Core.Abstractions;
using PPGCRM.Core.Contracts;
using PPGCRM.Core.Models;

namespace PPGCRM.Application.Services
{
    public class ProjectsService : IProjectsService
    {
        private readonly IProjectsRepository _projectsRepository;
        private readonly IMapper _mapper;

        public ProjectsService(IProjectsRepository projectsRepository, IMapper mapper)
        {
            _projectsRepository = projectsRepository;
            _mapper = mapper;
        }
        public async Task<List<ProjectModel>> GetAllProjectsOnlyAsync()
        {
            return await _projectsRepository.GetAllProjectsOnlyAsync();
        }

        public async Task<ProjectModel?> GetProjectOnlyByIdAsync(Guid projectId)
        {
            return await _projectsRepository.GetProjectOnlyByIdAsync(projectId);
        }

        public async Task<ProjectModel?> GetAllProjectDetailsById(Guid projectId)
        {
            return await _projectsRepository.GetAllProjectDetailsById(projectId);
        }

        public async Task AddProjectAsync(ProjectCreateDTO projectCreateDto)
        {
            var projectModel = new ProjectModel(
                Guid.NewGuid(),
                null,
                projectCreateDto.ProjectName,
                null,
                projectCreateDto.Status,
                null,
                null,
                null,
                0,
                0,
                0,
                false,
                new List<StageModel>());

            await _projectsRepository.AddProjectAsync(projectModel);
        }

        public async Task UpdateProjectAsync(Guid projectId, ProjectUpdateDTO projectUpdateDto)
        {
            await _projectsRepository.UpdateProjectAsync(projectId, projectUpdateDto);
        }

        public async Task DeleteProjectAsync(Guid projectId)
        {
            await _projectsRepository.DeleteProjectAsync(projectId);
        }
    }
}
