using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using PPGCRM.Core.Abstractions.Clients;
using PPGCRM.Core.Contracts.Clients;
using PPGCRM.Core.Models;

namespace PPGCRM.Application.Services
{
    public class ClientsService : IClientsService
    {
        private readonly IClientsRepository _clientsRepository;
        private readonly IMapper _mapper;

        public ClientsService(IClientsRepository clientsRepository, IMapper mapper)
        {
            _clientsRepository = clientsRepository;
            _mapper = mapper;
        }

        public async Task<List<ClientDetailsDTO>> GetAllClientsAsync()
        {
            return await _clientsRepository.GetAllClientsAsync();
        }

        public async Task<ClientModel?> GetClientByIdAsync(Guid clientId)
        {
            return await _clientsRepository.GetClientByIdAsync(clientId);
        }

        public async Task AddClientAsync(ClientCreateDTO clientCreateDto)
        {
            var clientModel = new ClientModel(
                Guid.NewGuid(), 
                clientCreateDto.CompanyName,
                null,
                null,
                null,
                null,
                null
                );

            await _clientsRepository.AddClientAsync(clientModel);
        }

        public async Task UpdateClientAsync(Guid clientId, ClientUpdateDTO clientUpdateDto)
        {
            await _clientsRepository.UpdateClientAsync(clientId, clientUpdateDto);
        }

        public async Task DeleteClientAsync(Guid clientId)
        {
            await _clientsRepository.DeleteClientAsync(clientId);
        }
    }
}
