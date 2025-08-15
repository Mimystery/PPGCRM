using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PPGCRM.Core.Abstractions.Clients;
using PPGCRM.Core.Contracts.Clients;
using PPGCRM.Core.Models;

namespace PPGCRM.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ClientsController : ControllerBase
    {
        private readonly IClientsService _clientsService;
        private readonly IMapper _mapper;

        public ClientsController(IClientsService clientsService, IMapper mapper)
        {
            _clientsService = clientsService;
            _mapper = mapper;
        }

        [HttpGet("AllClients")]
        public async Task<ActionResult<List<ClientDetailsDTO>>> GetAllClients()
        {
            var clients = await _clientsService.GetAllClientsAsync();

            return Ok(clients);
        }

        [HttpGet("ClientById/{clientId}")]
        public async Task<ActionResult<ClientModel>> GetClientById(Guid clientId)
        {
            var client = await _clientsService.GetClientByIdAsync(clientId);

            return Ok(client);
        }

        [HttpPost("AddClient")]
        public async Task<ActionResult> AddClient([FromBody] ClientCreateDTO clientCreateDto)
        {
            await _clientsService.AddClientAsync(clientCreateDto);
            return Ok();
        }

        [HttpPut("UpdateClient/{clientId}")]
        public async Task<ActionResult> UpdateClient(Guid clientId, [FromBody] ClientUpdateDTO clientUpdateDto)
        {
            await _clientsService.UpdateClientAsync(clientId, clientUpdateDto);
            return Ok();
        }
        //3acefeae-a587-4c61-88a6-d414daf543bc 55c9501e-29ff-4abf-bc47-4ee2806d8cfb 5c5ed869-7eb7-45bf-b68c-ff9608c7741b
        [HttpDelete("DeleteClient/{clientId}")]
        public async Task<ActionResult> DeleteClient(Guid clientId)
        {
            await _clientsService.DeleteClientAsync(clientId);
            return Ok();
        }
    }
}