using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PPGCRM.Core.Models;
using PPGCRM.DataAccess.Entities;

namespace PPGCRM.DataAccess.Repositories
{
    public class PendingUsersRepository : IPendingUsersRepository
    {
        private readonly CRMDbContext _context;
        private readonly IMapper _mapper;

        public PendingUsersRepository(CRMDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<PendingUserModel>> GetAllPendingUsersAsync()
        {
            var pendingUsers = await _context.PendingUsers.ToListAsync();
            return _mapper.Map<List<PendingUserModel>>(pendingUsers);
        }

        public async Task<PendingUserModel> GetPendingUserByIdAsync(Guid pendingUserId)
        {
            var pendingUser = await _context.PendingUsers
                .FirstOrDefaultAsync(u => u.UserId == pendingUserId);
            return _mapper.Map<PendingUserModel>(pendingUser);
        }

        public async Task<PendingUserModel> GetPendingUserByRegistrationCodeAsync(string registrationCode)
        {
            var pendingUser = await _context.PendingUsers
                .FirstOrDefaultAsync(u => u.RegistrationCode == registrationCode);

            if (pendingUser == null)
            {
                throw new KeyNotFoundException("Pending user not found with the provided registration code.");
            }

            if (pendingUser.isRegistered)
            {
                throw new InvalidOperationException("This registration code has already been used.");
            }

            pendingUser.isRegistered = true; 
            await _context.SaveChangesAsync();

            return _mapper.Map<PendingUserModel>(pendingUser);
        }

        public async Task AddPendingUserAsync(PendingUserModel pendingUser)
        {
            var userEntity = _mapper.Map<PendingUserEntity>(pendingUser);
            _context.PendingUsers.Add(userEntity);
            await _context.SaveChangesAsync();
        }
        public async Task UpdatePendingUserPropertyAsync(string registrationCode)
        {
            throw new NotImplementedException();
        }
        public async Task DeletePendingUserAsync(Guid pendingUserId)
        {
            var pendingUser = await _context.PendingUsers
                .FirstOrDefaultAsync(u => u.UserId == pendingUserId);
            if (pendingUser != null)
            {
                _context.PendingUsers.Remove(pendingUser);
                await _context.SaveChangesAsync();
            }
        }
    }
}
