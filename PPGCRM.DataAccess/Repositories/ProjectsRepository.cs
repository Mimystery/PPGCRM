using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PPGCRM.Core.Abstractions;
using PPGCRM.Core.Contracts;
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

        public async Task<ProjectModel?> GetProjectOnlyByIdAsync(Guid projectId)
        {
            var project = await _context.Projects.FirstOrDefaultAsync(p => p.ProjectId == projectId);

            return _mapper.Map<ProjectModel>(project);
        }

        public async Task<ProjectModel?> GetAllProjectDetailsById(Guid projectId)
        {
            var project = await _context.Projects
                .Include(p => p.Client)
                .Include(p => p.Stages)
                    .ThenInclude(s => s.Processes)
                .FirstOrDefaultAsync(p => p.ProjectId == projectId);

            return _mapper.Map<ProjectModel>(project);
        }

        public async Task AddProjectAsync(ProjectModel projectModel)
        {
            var projectEntity = _mapper.Map<ProjectEntity>(projectModel); 
            _context.Projects.Add(projectEntity);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateProjectAsync(Guid projectId, ProjectUpdateDTO projectUpdateDto)
        {
            var projectEntity = await _context.Projects.FirstOrDefaultAsync(p => p.ProjectId == projectId);
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

            if (projectUpdateDto.Progress != null)
            {
                projectEntity.Progress = projectUpdateDto.Progress.Value;
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
