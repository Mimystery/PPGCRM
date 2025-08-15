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
    public class RefreshTokensRepository : IRefreshTokensRepository
    {
        private readonly CRMDbContext _context;
        private readonly IMapper _mapper;

        public RefreshTokensRepository(CRMDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<RefreshTokenModel?> GetByTokenAsync(string token)
        {
            var refToken =  await _context.RefreshTokens
                .FirstOrDefaultAsync(rt => rt.Token == token && !rt.IsRevoked);
            return _mapper.Map<RefreshTokenModel>(refToken);
        }

        public async Task AddAsync(RefreshTokenModel refreshToken)
        {
            await _context.RefreshTokens.AddAsync(_mapper.Map<RefreshTokenEntity>(refreshToken));
            await _context.SaveChangesAsync();
        }

        public async Task Delete(string token)
        {
            await _context.RefreshTokens.Where(t => t.Token == token).ExecuteDeleteAsync();

        }
    }
}
