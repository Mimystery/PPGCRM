using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using PPGCRM.Application.Identity.Authentication.AuthContracts;

namespace PPGCRM.API.Extensions
{
    public static class ApiExtentions
    {
        public static void AddApiAuthentication(this IServiceCollection services, IOptions<JwtOptions> jwtOptions)
        {

            var secretKey = Environment.GetEnvironmentVariable("JWT_SECRET_KEY");
            if (string.IsNullOrEmpty(secretKey))
            {
                throw new Exception("JWT_SECRET_KEY is not set in environment variables.");
            }

            // Configure JWT authentication
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme,options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = jwtOptions.Value.Issuer,
                        ValidAudience = jwtOptions.Value.Audience,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey)),
                    };
                });
            services.AddAuthorization();
        }
    }
}
