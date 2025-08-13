using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using PPGCRM.Application.Identity.Authentication.AuthContracts;
using PPGCRM.Application.Identity.Authentication.Interfaces;
using PPGCRM.Core.Models;

namespace PPGCRM.Application.Identity.Services
{
    public class JwtProvider : IJwtProvider
    {
        private readonly JwtOptions _jwtOptions;

        public JwtProvider(IOptions<JwtOptions> jwtOptions)
        {
            _jwtOptions = jwtOptions.Value;
            _jwtOptions = jwtOptions.Value;
            _jwtOptions.SecretKey = Environment.GetEnvironmentVariable("JWT_SECRET_KEY")
                                    ?? throw new Exception("JWT_SECRET_KEY is not set.");
        }

        public string GenerateToken(UserModel user)
        {

            var claims = new List<Claim>
            {
                new Claim("Id", user.UserId.ToString()),
                new Claim("Email", user.Email ?? string.Empty),
                new Claim("FirstName", user.FirstName ?? string.Empty),
                new Claim("LastName", user.LastName ?? string.Empty),
                new Claim("Role", user.Role.ToString()),
                // Add more claims as needed
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtOptions.SecretKey));
            var signingCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                claims: claims,
                signingCredentials: signingCredentials,
                issuer: _jwtOptions.Issuer,
                audience: _jwtOptions.Audience,
                expires: DateTime.UtcNow.AddMinutes(_jwtOptions.AccessTokenExpirationMinutes)
                );
            //Для отладки чтобы работало нужно в PowerShell выполнить команду: setx JWT_SECRET_KEY "5i936cf0vfb6vcjzyucdpxyrh5es6oj8"
            var tokenValue = new JwtSecurityTokenHandler().WriteToken(token);
            return tokenValue;
        }

        public string GenerateRefreshToken()
        {
            var randomBytes = new byte[64];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomBytes);
            return Convert.ToBase64String(randomBytes);
        }
    }
}
