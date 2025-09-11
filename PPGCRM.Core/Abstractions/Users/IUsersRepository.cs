using PPGCRM.Core.Contracts.Processes;
using PPGCRM.Core.Contracts.Projects;
using PPGCRM.Core.Contracts.Users;
using PPGCRM.Core.Models;

namespace PPGCRM.DataAccess.Repositories;

public interface IUsersRepository
{
    Task<List<UserMainCardDTO>> GetAllUsersAsync();
    Task<UserDetailsDTO> GetUserDetailsByIdAsync(Guid userId);
    Task<UserModel?> GetUserByIdAsync(Guid userId);
    Task<UserModel?> GetUserByEmailAsync(string email);
    Task<List<ProcessMainCardDTO>> GetUserProcessesAsync(Guid userId, Guid? projectId, Guid? stageId);
    Task AddUserAsync(UserModel user);
    Task UpdateUserAsync(Guid userId, UserUpdateDTO userUpdateDto);
    Task DeleteUserAsync(Guid userId);
    Task<List<ProjectDetailsDTO>> GetProjectsByUserIdAsync(Guid userId);
    Task<List<ProcessModel>> GetProcessesByUserIdAsync(Guid userId);
}