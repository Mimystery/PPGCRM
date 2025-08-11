using PPGCRM.Core.Models;

namespace PPGCRM.DataAccess.Repositories;

public interface IPendingUsersRepository
{
    Task<List<PendingUserModel>> GetAllPendingUsersAsync();
    Task<PendingUserModel> GetPendingUserByIdAsync(Guid pendingUserId);
    Task<PendingUserModel> GetPendingUserByRegistrationCode(string registrationCode);
    Task<string> AddPendingUser(PendingUserModel pendingUser);
    Task UpdatePendingUser(PendingUserModel pendingUser);
    Task DeletePendingUser(Guid pendingUserId);
}