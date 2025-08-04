using PPGCRM.Core.Contracts.Clients;
using PPGCRM.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PPGCRM.Core.Abstractions.Clients
{
    public interface IClientsService
    {
        Task<List<ClientDetailsDTO>> GetAllClientsAsync();
        Task<ClientModel?> GetClientByIdAsync(Guid clientId);
        Task AddClientAsync(ClientCreateDTO clientCreateDto);
        Task UpdateClientAsync(Guid clientId, ClientUpdateDTO clientUpdateDto);
        Task DeleteClientAsync(Guid clientId);
    }
}
