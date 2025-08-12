using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PPGCRM.Application.Identity.Authentication.AuthContracts
{
    public class JwtOptions
    {
        public string Issuer { get; set; } = string.Empty;
        public string Audience { get; set; } = string.Empty;
        public int AccessTokenExpirationMinutes { get; set; }
        public string SecretKey { get; set; } = string.Empty;
    }
}
