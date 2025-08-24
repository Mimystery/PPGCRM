using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PPGCRM.Core.Abstractions.Projects;
using PPGCRM.Core.Contracts.Project;
using PPGCRM.Core.Contracts.Projects;
using PPGCRM.Core.Enums;
using PPGCRM.Core.Models;
using PPGCRM.DataAccess.Entities;

namespace PPGCRM.DataAccess.Repositories
{
    public class ProjectsRepository : IProjectsRepository
    {
        private readonly CRMDbContext _context;
        private readonly IMapper _mapper;

        public ProjectsRepository(CRMDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<ProjectModel>> GetAllProjectsOnlyAsync()
        {
            var projects = await _context.Projects.ToListAsync();

            return _mapper.Map<List<ProjectModel>>(projects);
        }

        public async Task<List<ProjectMainDTO>> GetAllProjectMainDataAsync()
        {
            var projects = await _context.Projects
                .Include(p => p.Stages)
                .ThenInclude(s => s.Processes).ToListAsync();

            var result = projects.Select(project => new ProjectMainDTO
            {
                ProjectId = project.ProjectId,
                ProjectName = project.ProjectName,
                Status = Enum.TryParse<ProjectStatus>(project.Status, out var status) ? status : ProjectStatus.NotStarted,
                StartDate = project.StartDate,
                EndDate = project.EndDate,
                IsArchived = project.IsArchived,
                ProcessCountByStatus = project.Stages
                    .SelectMany(s => s.Processes)
                    .GroupBy(p => Enum.TryParse<ProcessStatus>(p.Status, out var result) ? result : ProcessStatus.ToDo)
                    .ToDictionary(g => g.Key, g => g.Count())
            }).ToList();

            return result;
        }

        public async Task<ProjectModel?> GetProjectOnlyByIdAsync(Guid projectId)
        {
            var project = await _context.Projects.FirstOrDefaultAsync(p => p.ProjectId == projectId);

            return _mapper.Map<ProjectModel>(project);
        }

        public async Task<ProjectDetailsDTO?> GetAllProjectDetailsById(Guid projectId)
        {
            var project = await _context.Projects
                .Include(p => p.Client)
                .Include(p => p.Stages)
                    .ThenInclude(s => s.Processes)
                        .ThenInclude(p => p.Tasks)
                .Include(p => p.Stages)
                    .ThenInclude(s => s.Processes)
                        .ThenInclude(proc => proc.ResponsibleUsers)
                .FirstOrDefaultAsync(p => p.ProjectId == projectId);

            return _mapper.Map<ProjectDetailsDTO>(project);
        }

        public async Task AddProjectAsync(ProjectModel projectModel)
        {
            var projectEntity = _mapper.Map<ProjectEntity>(projectModel); 
            await _context.Projects.AddAsync(projectEntity);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateProjectAsync(Guid projectId, ProjectUpdateDTO projectUpdateDto)
        {
            var projectEntity = await _context.Projects
                .FirstOrDefaultAsync(p => p.ProjectId == projectId);

            if (projectEntity == null)
            {
                throw new KeyNotFoundException($"Project with ID {projectId} not found.");
            }

            if (projectUpdateDto.ProjectName != null)
            {
                projectEntity.ProjectName = projectUpdateDto.ProjectName;
            }

            if (projectUpdateDto.Description != null)
            {
                projectEntity.Description = projectUpdateDto.Description;
            }

            if (projectUpdateDto.ClientId != null)
            {
                projectEntity.ClientId = projectUpdateDto.ClientId;
            }

            if (projectUpdateDto.Status != null)
            {
                projectEntity.Status = projectUpdateDto.Status.ToString();
            }

            if (projectUpdateDto.StartDate != null)
            {
                projectEntity.StartDate = projectUpdateDto.StartDate.Value;
            }

            if (projectUpdateDto.EndDate != null)
            {
                projectEntity.EndDate = projectUpdateDto.EndDate.Value;
            }

            if (projectUpdateDto.ConstructionWorksStart != null)
            {
                projectEntity.ConstructionWorksStart = projectUpdateDto.ConstructionWorksStart.Value;
            }

            if (projectUpdateDto.Budget != null)
            {
                projectEntity.Budget = projectUpdateDto.Budget.Value;
            }

            if (projectUpdateDto.Expenses != null)
            {
                projectEntity.Expenses = projectUpdateDto.Expenses.Value;
            }

            if (projectUpdateDto.IsArchived != null)
            {
                projectEntity.IsArchived = projectUpdateDto.IsArchived.Value;
            }

            await _context.SaveChangesAsync();
        }

        public async Task DeleteProjectAsync(Guid projectId)
        {
            var projectEntity = await _context.Projects.FirstOrDefaultAsync(p => p.ProjectId == projectId);
            if (projectEntity == null)
            {
                throw new KeyNotFoundException($"Project with ID {projectId} not found.");
            }
            _context.Projects.Remove(projectEntity);
            await _context.SaveChangesAsync();
        }
    }
}
