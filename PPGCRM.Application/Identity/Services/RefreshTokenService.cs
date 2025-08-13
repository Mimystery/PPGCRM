using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PPGCRM.Application.Identity.Authentication.AuthContracts;
using PPGCRM.Application.Identity.Authentication.Interfaces;
using PPGCRM.Core.Models;
using PPGCRM.DataAccess.Repositories;

namespace PPGCRM.Application.Identity.Services
{
    public class RefreshTokenService : IRefreshTokenService
    {
        private readonly IRefreshTokensRepository _refreshTokensRepository;
        private readonly JwtOptions _jwtOptions;

        public RefreshTokenService(IRefreshTokensRepository refreshTokensRepository, 
            JwtOptions jwtOptions)
        {
            _refreshTokensRepository = refreshTokensRepository;
            _jwtOptions = jwtOptions;
        }

        public async Task<RefreshTokenModel?> GetRefreshTokenAsync(string refreshToken)
        {
            return await _refreshTokensRepository.GetByTokenAsync(refreshToken);
        }

        public async Task SaveRefreshTokenAsync(Guid userId, string refreshToken)
        {
            var token = new RefreshTokenModel
            {
                Id = Guid.NewGuid(),
                UserId = userId,
                Token = refreshToken,
                Expires = DateTime.UtcNow.AddDays(30),
                IsRevoked = false
            };

            await _refreshTokensRepository.AddAsync(token);
        }

        public async Task DeleteRefreshTokenAsync(string refreshToken)
        {
            await _refreshTokensRepository.Delete(refreshToken);
        }
    }
}
