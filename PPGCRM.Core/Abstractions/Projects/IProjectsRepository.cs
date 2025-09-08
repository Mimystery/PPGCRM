using Microsoft.EntityFrameworkCore;
using PPGCRM.Core.Contracts.Project;
using PPGCRM.Core.Contracts.Projects;
using PPGCRM.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PPGCRM.Core.Abstractions.Projects
{
    public interface IProjectsRepository
    {
        Task<List<ProjectModel>> GetAllProjectsOnlyAsync();
        Task<List<ProjectModel>> GetAllArchivedProjectsOnlyAsync();
        Task<List<ProjectMainDTO>> GetAllProjectMainDataAsync();
        Task<ProjectModel?> GetProjectOnlyByIdAsync(Guid projectId);
        Task<ProjectDetailsDTO?> GetAllProjectDetailsById(Guid projectId);
        Task AddProjectAsync(ProjectModel projectModel);
        Task UpdateProjectAsync(Guid projectId, ProjectUpdateDTO projectUpdateDto);
        Task DeleteProjectAsync(Guid projectId);
    }
}
