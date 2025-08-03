using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PPGCRM.Core.Models;

namespace PPGCRM.Core.Abstractions
{
    public interface IProjectsRepository
    {
        Task<List<ProjectModel>> GetAllProjectsOnlyAsync();
        Task<ProjectModel?> GetProjectOnlyByIdAsync(Guid projectId);
        Task<ProjectModel?> GetAllProjectDetailsById(Guid projectId);
    }
}
