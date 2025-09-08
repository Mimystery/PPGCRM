using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;

namespace PPGCRM.DataAccess.Repositories
{
    public class ProcessPausesRepository
    {
        private readonly CRMDbContext _context;
        private readonly IMapper _mapper;

        public ProcessPausesRepository(CRMDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
    }
}