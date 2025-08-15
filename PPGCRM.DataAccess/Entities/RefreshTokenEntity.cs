using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PPGCRM.DataAccess.Entities
{
    public class RefreshTokenEntity
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public UserEntity User { get; set; }
        public string Token { get; set; }
        public DateTime Expires { get; set; }
        public bool IsRevoked { get; set; }
    }
}
