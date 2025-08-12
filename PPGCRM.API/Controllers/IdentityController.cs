using Microsoft.AspNetCore.Mvc;
using PPGCRM.Application.Identity.Authentication.Interfaces;
using PPGCRM.Core.Contracts.Users;
using PPGCRM.DataAccess.Repositories;

namespace PPGCRM.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class IdentityController : ControllerBase
    {
        private readonly IIdentityService _identityService;
        private readonly IPendingUsersRepository _pendingUsersRepository;
        private readonly IUsersRepository _usersRepository;
        private readonly IUserService _userService;

        public IdentityController(IIdentityService identityService, IPendingUsersRepository pendingUsersRepository,
            IUsersRepository usersRepository, IUserService userService)
        {
            _identityService = identityService;
            _pendingUsersRepository = pendingUsersRepository;
            _usersRepository = usersRepository;
            _userService = userService;
        }

        [HttpPost("RegisterByAdmin")]
        public async Task<ActionResult> RegisterByAdmin([FromBody] UserCreateByAdminDTO userCreateByAdminDto)
        {
            var registrationCode = await _identityService.RegisterByAdmin(userCreateByAdminDto);
            return Ok(registrationCode);
        }

        [HttpPost("RegisterByUser/{registrationCode}")]
        public async Task<ActionResult> RegisterByUser([FromBody] UserCreateByEmployeeDTO userCreateByEmployeeDto, 
            string registrationCode)
        {
            await _identityService.RegisterByUser(userCreateByEmployeeDto, registrationCode);
            return Ok();
        }
        [HttpPost("Login")]
        public async Task<ActionResult> Login([FromBody] UserLoginDTO userLoginDto)
        {
            var token = await _identityService.Login(userLoginDto);
            return Ok(token);
        }

        [HttpPost("RefreshToken")]
        public async Task<ActionResult> RefreshToken([FromBody] string refreshToken)
        {
            var token = await _identityService.RefreshToken(refreshToken);
            return Ok(token);
        }
    }
}
