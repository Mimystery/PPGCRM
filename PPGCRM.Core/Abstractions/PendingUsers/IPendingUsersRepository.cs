using PPGCRM.Core.Models;

namespace PPGCRM.DataAccess.Repositories;

public interface IPendingUsersRepository
{
    Task<List<PendingUserModel>> GetAllPendingUsersAsync();
    Task<PendingUserModel> GetPendingUserByIdAsync(Guid pendingUserId);
    Task<PendingUserModel> GetPendingUserByRegistrationCodeAsync(string registrationCode);
    Task<string> AddPendingUserAsync(PendingUserModel pendingUser);
    Task UpdatePendingUserPropertyAsync(string registrationCode);
    Task DeletePendingUserAsync(Guid pendingUserId);
}