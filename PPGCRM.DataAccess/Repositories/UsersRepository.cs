using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PPGCRM.Core.Contracts.Clients;
using PPGCRM.Core.Contracts.Processes;
using PPGCRM.Core.Contracts.Projects;
using PPGCRM.Core.Contracts.Users;
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
    public class UsersRepository : IUsersRepository
    {
        private readonly CRMDbContext _context;
        private readonly IMapper _mapper;

        public UsersRepository(CRMDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<UserMainCardDTO>> GetAllUsersAsync()
        {
            var users = await _context.Users.ToListAsync();
            return _mapper.Map<List<UserMainCardDTO>>(users);
        }

        public async Task<UserDetailsDTO> GetUserDetailsByIdAsync(Guid userId)
        {
            var users = await _context.Users.FirstOrDefaultAsync(u => u.UserId == userId);

            return _mapper.Map<UserDetailsDTO>(users);
        }

        public async Task<UserModel?> GetUserByIdAsync(Guid userId)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserId == userId);
            if (user == null)
            {
                throw new KeyNotFoundException("User not found with the provided ID.");
            }

            return _mapper.Map<UserModel>(user);
        }

        public async Task<UserModel?> GetUserByEmailAsync(string email)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (user == null)
            {
                throw new KeyNotFoundException("User not found with the provided email.");
            }

            return _mapper.Map<UserModel>(user);
        }

        public async Task<List<ProcessMainCardDTO>> GetUserProcessesAsync(Guid userId, Guid? projectId, Guid? stageId)
        {
            var query = _context.Processes
                .Where(p => p.ResponsibleUsers.Any(u => u.UserId == userId));

            if (projectId.HasValue)
            {
                query = query.Where(p => p.Stage.ProjectId == projectId.Value);
            }

            if (stageId.HasValue)
            {
                query = query.Where(p => p.StageId == stageId.Value);
            }

            var processes = await query.Include(p => p.ResponsibleUsers).ToListAsync();
            return _mapper.Map<List<ProcessMainCardDTO>>(processes);
        }

        public async Task AddUserAsync(UserModel user)
        {
            var userEntity = _mapper.Map<UserEntity>(user);
            _context.Users.Add(userEntity);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateUserAsync(Guid userId, UserUpdateDTO userUpdateDto)
        {
            var userEntity = await _context.Users
                .FirstOrDefaultAsync(u => u.UserId == userId);

            if (userEntity == null)
            {
                throw new KeyNotFoundException("User not found");
            }

            if (userUpdateDto.UserName != null)
            {
                userEntity.UserName = userUpdateDto.UserName;
            }

            if (userUpdateDto.PasswordHash != null)
            {
                userEntity.PasswordHash = userUpdateDto.PasswordHash;
            }

            if (userUpdateDto.FirstName != null)
            {
                userEntity.FirstName = userUpdateDto.FirstName;
            }

            if (userUpdateDto.LastName != null)
            {
                userEntity.LastName = userUpdateDto.LastName;
            }

            if (userUpdateDto.Email != null)
            {
                userEntity.Email = userUpdateDto.Email;
            }

            if (userUpdateDto.Phone != null)
            {
                userEntity.Phone = userUpdateDto.Phone;
            }

            if (userUpdateDto.Role != null)
            {
                userEntity.Role = userUpdateDto.Role;
            }

            if (userUpdateDto.Salary != null)
            {
                userEntity.Salary = userUpdateDto.Salary.Value;
            }

            await _context.SaveChangesAsync();
        }

        public async Task DeleteUserAsync(Guid userId)
        {
            await _context.Users.Where(u => u.UserId == userId).ExecuteDeleteAsync();
        }

        public async Task<List<ProjectDetailsDTO>> GetProjectsByUserIdAsync(Guid userId)
        {
            //var projects = await _context.Projects
            //    .Where(p => p.Stages.Any(s => s.Processes.Any(pr => pr.ResponsibleUsers.Any(u => u.UserId == userId))))
            //    .Include(p => p.Stages)
            //        .ThenInclude(s => s.Processes)
            //            .ThenInclude(pr => pr.ResponsibleUsers)
            //    .Include(p => p.Stages)
            //        .ThenInclude(s => s.Processes)
            //            .ThenInclude(p => p.Tasks)
            //    .Include(p => p.Stages)
            //        .ThenInclude(s => s.Processes)
            //            .ThenInclude(p => p.ProcessPauses)
            //    .ToListAsync();

            //var processes = await _context.Processes.Where(p => p.ResponsibleUsers.Any(u => u.UserId == userId)).ToListAsync();

            //return _mapper.Map<List<ProjectDetailsDTO>>(projects);

            var processes = await _context.Processes
                .Where(p => p.ResponsibleUsers.Any(u => u.UserId == userId))
                .Include(p => p.ResponsibleUsers)
                .Include(p => p.Tasks)
                .Include(p => p.ProcessPauses).Include(processEntity => processEntity.Stage)
                .ThenInclude(stageEntity => stageEntity.Project).ThenInclude(projectEntity => projectEntity.Client)
                .ToListAsync();

            // 2. Группируем процессы по проекту через стадию
            var projectsGrouped = processes
                .GroupBy(p => p.Stage.Project)
                .ToList();

            var projectDTOs = new List<ProjectDetailsDTO>();

            foreach (var projectGroup in projectsGrouped)
            {
                var project = projectGroup.Key;

                var stages = projectGroup
                    .GroupBy(p => p.Stage) // группы по стадиям
                    .Select(stageGroup => new StageModel(
                        stageGroup.Key.StageId,
                        stageGroup.Key.ProjectId,
                        stageGroup.Key.StageName,
                        stageGroup.Key.PlanEndDate,
                        stageGroup.Key.CreatedAt,
                        stageGroup.Select(pr => _mapper.Map<ProcessModel>(pr)).ToList()
                    ))
                    .ToList();

                var projectDTO = new ProjectDetailsDTO
                {
                    ProjectId = project.ProjectId,
                    ClientId = project.ClientId,
                    Client = _mapper.Map<ClientInProjectDTO>(project.Client),
                    ProjectName = project.ProjectName,
                    Description = project.Description,
                    Status = Enum.TryParse<ProjectStatus>(project.Status, out var status) ? status : ProjectStatus.NotStarted,
                    StartDate = project.StartDate,
                    EndDate = project.EndDate,
                    ConstructionWorksStart = project.ConstructionWorksStart,
                    Budget = project.Budget,
                    Expenses = project.Expenses,
                    IsArchived = project.IsArchived,
                    Stages = stages
                };

                projectDTOs.Add(projectDTO);
            }

            return projectDTOs;
        }

        public async Task<List<ProcessModel>> GetProcessesByUserIdAsync(Guid userId)
        {
            var processes = await _context.Processes.Where(p => p.ResponsibleUsers.Any(u => u.UserId == userId))
                .Include(p => p.ResponsibleUsers)
                .Include(p => p.Tasks)
                .Include(p => p.ProcessPauses)
                .Include(p => p.Stage)
                .ThenInclude(s => s.Project).ThenInclude(projectEntity => projectEntity.Client).ToListAsync();
            return _mapper.Map<List<ProcessModel>>(processes);
        }
    }
}
