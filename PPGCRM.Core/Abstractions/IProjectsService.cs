using PPGCRM.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PPGCRM.Core.Contracts;

namespace PPGCRM.Core.Abstractions
{
    public interface IProjectsService
    {
        Task<List<ProjectModel>> GetAllProjectsOnlyAsync();
        Task<ProjectModel?> GetProjectOnlyByIdAsync(Guid projectId);
        Task<ProjectModel?> GetAllProjectDetailsById(Guid projectId);
        Task AddProjectAsync(ProjectCreateDTO projectCreateDto);
        Task UpdateProjectAsync(Guid projectId, ProjectUpdateDTO projectUpdateDto);
        Task DeleteProjectAsync(Guid projectId);
    }
}
