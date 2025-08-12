using PPGCRM.Application.Identity.Authentication.AuthContracts;
using PPGCRM.Core.Contracts.Users;

namespace PPGCRM.Application.Identity.Authentication.Interfaces;

public interface IIdentityService
{
    Task<string> RegisterByAdmin(UserCreateByAdminDTO userCreateByAdminDto);
    Task RegisterByUser(UserCreateByEmployeeDTO userCreateByEmployeeDto, string registrationCode);
    Task<TokenDTO> Login(UserLoginDTO userLoginDto);
    Task<TokenDTO> RefreshToken(string refreshToken);
}