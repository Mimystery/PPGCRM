using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PPGCRM.Core.Abstractions;
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
    }
}
