using Microsoft.AspNetCore.Mvc;
using PPGCRM.Application.Services;
using PPGCRM.Core.Contracts.Processes;
using PPGCRM.Core.Contracts.Users;
using PPGCRM.Core.Models;

namespace PPGCRM.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUsersService _usersService;

        public UsersController(IUsersService usersService)
        {
            _usersService = usersService;
        }

        [HttpGet("GetAllUsers")]
        public async Task<ActionResult<UserMainCardDTO>> GetAllUsers()
        {
            var users = await _usersService.GetAllUsersAsync();
            return Ok(users);
        }

        [HttpGet("GetUserDetails/{userId}")]
        public async Task<ActionResult<UserDetailsDTO>> GetUserDetails(Guid userId)
        {
            var user = await _usersService.GetUserDetailsByIdAsync(userId);
            return Ok(user);
        }

        [HttpGet("GetUserByEmail/{email}")]
        public async Task<ActionResult<UserModel>> GetUserByEmail(string email)
        {
            var user = await _usersService.GetUserByEmailAsync(email);
            if (user == null)
            {
                return NotFound(new { message = "User not found." });
            }

            return Ok(user);
        }

        [HttpGet("GetUserProcesses")]
        public async Task<ActionResult<List<ProcessMainCardDTO>>> GetUserProcesses([FromQuery] Guid userId,
            [FromQuery] Guid? projectId = null, [FromQuery] Guid? stageId = null)
        {
            var processes = await _usersService.GetUserProcessesAsync(userId, projectId, stageId);
            return Ok(processes);
        }

        [HttpPost("AddUser")]
        public async Task<ActionResult> AddUser([FromBody] UserModel user)
        {
            await _usersService.AddUserAsync(user);
            return Ok();
        }

        [HttpPut("UpdateUser/{userId}")]
        public async Task<ActionResult> UpdateUser(Guid userId, [FromBody] UserUpdateDTO userUpdateDto)
        {
            await _usersService.UpdateUserAsync(userId, userUpdateDto);
            return Ok();
        }

        [HttpDelete("DeleteUser/{userId}")]
        public async Task<ActionResult> DeleteUser(Guid userId)
        {
            await _usersService.DeleteUserAsync(userId);
            return Ok();
        }
    }
}
