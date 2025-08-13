using Microsoft.AspNetCore.Mvc;
using PPGCRM.Application.Identity.Authentication.Interfaces;
using PPGCRM.Application.Services;
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

        public IdentityController(IIdentityService identityService, IPendingUsersRepository pendingUsersRepository,
            IUsersRepository usersRepository)
        {
            _identityService = identityService;
            _pendingUsersRepository = pendingUsersRepository;
            _usersRepository = usersRepository;
        }

        [HttpPost("RegisterByAdmin")] //09a6b841a2aa4e84a4f1f30c124340f6
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

        [HttpGet("CheckPendingUser/{registrationCode}")]
        public async Task<ActionResult> CheckPendingUser(string registrationCode)
        {
            try
            {
                await _identityService.CheckPendingUserExistingByRegistrationCode(registrationCode);
                return Ok();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                // Логируй ошибку, если нужно
                return StatusCode(500, new { message = "Internal server error." });
            }
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
