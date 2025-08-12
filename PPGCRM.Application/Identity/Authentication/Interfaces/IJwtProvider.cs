using PPGCRM.Core.Models;

namespace PPGCRM.Application.Identity.Authentication.Interfaces;

public interface IJwtProvider
{
    string GenerateToken(UserModel user);
}