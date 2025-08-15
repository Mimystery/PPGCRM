using PPGCRM.Core.Models;

namespace PPGCRM.DataAccess.Repositories;

public interface IRefreshTokensRepository
{
    Task<RefreshTokenModel?> GetByTokenAsync(string token);
    Task AddAsync(RefreshTokenModel refreshToken);
    Task Delete(string token);
}