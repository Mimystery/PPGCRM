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

        public async Task<PendingUserModel> GetPendingUserByRegistrationCode(string registrationCode)
        {
            var pendingUser = await _context.PendingUsers
                .FirstOrDefaultAsync(u => u.RegistrationCode == registrationCode);
            return _mapper.Map<PendingUserModel>(pendingUser);
        }

        public async Task<string> AddPendingUser(PendingUserModel pendingUser)
        {
            var userEntity = _mapper.Map<PendingUserEntity>(pendingUser);
            _context.PendingUsers.Add(userEntity);
            await _context.SaveChangesAsync();
            return userEntity.RegistrationCode;
        }
        public async Task UpdatePendingUser(PendingUserModel pendingUser)
        {
            throw new NotImplementedException("UpdatePendingUser method is not implemented yet.");
        }
        public async Task DeletePendingUser(Guid pendingUserId)
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
