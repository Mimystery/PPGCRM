using PPGCRM.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PPGCRM.Core.Contracts.Clients;

namespace PPGCRM.Core.Abstractions.Clients
{
    public interface IClientsRepository
    {
        Task<List<ClientDetailsDTO>> GetAllClientsAsync();
        Task<ClientModel?> GetClientByIdAsync(Guid clientId);
        Task AddClientAsync(ClientModel clientModel);
        Task UpdateClientAsync(Guid clientId, ClientUpdateDTO clientUpdateDto);
        Task DeleteClientAsync(Guid clientId);
    }
}
