using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PPGCRM.Core.Abstractions.Clients;
using PPGCRM.Core.Contracts.Clients;
using PPGCRM.Core.Contracts.Projects;
using PPGCRM.Core.Enums;
using PPGCRM.Core.Models;
using PPGCRM.DataAccess.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PPGCRM.DataAccess.Repositories
{
    public class ClientsRepository : IClientsRepository
    {
        private readonly CRMDbContext _context;
        private readonly IMapper _mapper;

        public ClientsRepository(CRMDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<List<ClientDetailsDTO>> GetAllClientsAsync()
        {
            var clients = await _context.Clients
                .Include(c => c.Projects)
                .ThenInclude(p => p.Stages)
                .ThenInclude(s => s.Processes)
                .ToListAsync();

            var clientsList = clients.Select(client => new ClientDetailsDTO
            {
                ClientId = client.ClientId,
                CompanyName = client.CompanyName,
                Director = client.Director,
                ContactPerson = client.ContactPerson,
                ClientEmail = client.ClientEmail,
                ClientPhone = client.ClientPhone,
                Projects = client.Projects.Select(project => new ProjectInClientDTO
                {
                    ProjectId = project.ProjectId,
                    ProjectName = project.ProjectName,
                    Status = Enum.TryParse<ProjectStatus>(project.Status, out var status) 
                        ? status 
                        : ProjectStatus.NotStarted,
                    StartDate = project.StartDate,
                    EndDate = project.EndDate,
                    IsArchived = project.IsArchived,
                    ProcessCountByStatus = project.Stages
                        .SelectMany(s => s.Processes)
                        .GroupBy(p => Enum.TryParse<ProcessStatus>(p.Status, out var result) ? result : ProcessStatus.ToDo)
                        .ToDictionary(g => g.Key, g => g.Count())
                }).ToList()
            }).ToList();

            return clientsList;
        }

        public async Task<ClientModel?> GetClientByIdAsync(Guid clientId)
        {
            var client = await _context.Clients.FirstOrDefaultAsync(c => c.ClientId == clientId);

            return _mapper.Map<ClientModel>(client);
        }

        public async Task AddClientAsync(ClientModel clientModel)
        {
            var clientEntity = _mapper.Map<ClientEntity>(clientModel);
            _context.Clients.Add(clientEntity);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateClientAsync(Guid clientId, ClientUpdateDTO clientUpdateDto)
        {
            var clientEntity = await _context.Clients
                .Include(c => c.Projects)
                .FirstOrDefaultAsync(c => c.ClientId == clientId);

            if (clientEntity == null)
            {
                throw new KeyNotFoundException($"Client with ID {clientId} not found.");
            }

            if (clientUpdateDto.CompanyName != null)
            {
                clientEntity.CompanyName = clientUpdateDto.CompanyName;
            }
            if (clientUpdateDto.Director != null)
            {
                clientEntity.Director = clientUpdateDto.Director;
            }
            if (clientUpdateDto.ContactPerson != null)
            {
                clientEntity.ContactPerson = clientUpdateDto.ContactPerson;
            }
            if (clientUpdateDto.ClientEmail != null)
            {
                clientEntity.ClientEmail = clientUpdateDto.ClientEmail;
            }
            if (clientUpdateDto.ClientPhone != null)
            {
                clientEntity.ClientPhone = clientUpdateDto.ClientPhone;
            }

            if (clientUpdateDto.ProjectIDToDetach != null)
            {
                var projectToDetach = await _context.Projects
                    .FirstOrDefaultAsync(p => p.ProjectId == clientUpdateDto.ProjectIDToDetach
                    && p.ClientId == clientId);

                if (projectToDetach != null)
                {
                    projectToDetach.ClientId = null; 
                }
            }

            await _context.SaveChangesAsync();

        }

        public async Task DeleteClientAsync(Guid clientId)
        {
            await _context.Clients
                .Where(c => c.ClientId == clientId)
                .ExecuteDeleteAsync();
        }
    }
}
