using PPGCRM.Core.Models;

namespace PPGCRM.Application.Identity.Authentication.Interfaces;

public interface IRefreshTokenService
{
    Task<RefreshTokenModel?> GetRefreshTokenAsync(string refreshToken)
    Task SaveRefreshTokenAsync(Guid userId, string refreshToken);
    Task DeleteRefreshTokenAsync(string refreshToken);
}