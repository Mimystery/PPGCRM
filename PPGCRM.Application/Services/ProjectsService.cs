using AutoMapper;
using PPGCRM.Core.Abstractions.Projects;
using PPGCRM.Core.Contracts.Project;
using PPGCRM.Core.Contracts.Projects;
using PPGCRM.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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

        public async Task<List<ProjectModel>> GetAllArchivedProjectsOnlyAsync()
        {
            return await _projectsRepository.GetAllArchivedProjectsOnlyAsync();
        }

        public async Task<List<ProjectMainDTO>> GetAllProjectMainDataAsync()
        {
            return await _projectsRepository.GetAllProjectMainDataAsync();
        }

        public async Task<ProjectModel?> GetProjectOnlyByIdAsync(Guid projectId)
        {
            return await _projectsRepository.GetProjectOnlyByIdAsync(projectId);
        }

        public async Task<ProjectDetailsDTO?> GetAllProjectDetailsById(Guid projectId)
        {
            return await _projectsRepository.GetAllProjectDetailsById(projectId);
        }

        public async Task AddProjectAsync(ProjectCreateDTO projectCreateDto)
        {
            var projectModel = new ProjectModel(
                Guid.NewGuid(),
                null,
                null,
                projectCreateDto.ProjectName,
                null,
                projectCreateDto.Status,
                null,
                null,
                null,
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
