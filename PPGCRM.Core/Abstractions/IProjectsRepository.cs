using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PPGCRM.Core.Contracts;
using PPGCRM.Core.Models;

namespace PPGCRM.Core.Abstractions
{
    public interface IProjectsRepository
    {
        Task<List<ProjectModel>> GetAllProjectsOnlyAsync();
        Task<ProjectModel?> GetProjectOnlyByIdAsync(Guid projectId);
        Task<ProjectModel?> GetAllProjectDetailsById(Guid projectId);
        Task AddProjectAsync(ProjectModel projectModel);
        Task UpdateProjectAsync(Guid projectId, ProjectUpdateDTO projectUpdateDto);
        Task DeleteProjectAsync(Guid projectId);
    }
}
