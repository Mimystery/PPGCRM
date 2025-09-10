using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using PPGCRM.Application.Services;
using PPGCRM.Core.Contracts.ProcessFiles;
using PPGCRM.Core.Models;

namespace PPGCRM.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProcessFilesController : ControllerBase
    {
        private readonly IProcessFilesService _processFilesService;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment _env;

        public ProcessFilesController(IProcessFilesService processFilesService, IMapper mapper, IWebHostEnvironment env)
        {
            _processFilesService = processFilesService;
            _mapper = mapper;
            _env = env;
        }

        [HttpPost("UploadProcessFile/{processId}/files")]
        public async Task<ActionResult> UploadFile(Guid processId, IFormFile file, Guid? userId)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("No file uploaded.");
            }

            var uploadFolder = Path.Combine(_env.WebRootPath, "uploads", "processes", processId.ToString());
            if (!Directory.Exists(uploadFolder))
            {
                Directory.CreateDirectory(uploadFolder);
            }
            var filePath = Path.Combine(uploadFolder, file.FileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            var existingFile = await _processFilesService.GetFileByName(processId, file.FileName);

            if (existingFile != null)
            {
                existingFile.FileSize = file.Length;
                existingFile.MimeType = file.ContentType;
                existingFile.UploadedAt = DateTime.UtcNow;
                existingFile.UploadedBy = userId;

                await _processFilesService.UpdateFileAsync(existingFile);
            }
            else
            {
                var relativePath = $"/uploads/processes/{processId}/{file.FileName}";
                var processFile = new ProcessFileCreateDTO
                {
                    ProcessId = processId,
                    FileName = file.FileName,
                    FilePath = relativePath,
                    MimeType = file.ContentType,
                    FileSize = file.Length,
                    UploadedAt = DateTime.UtcNow,
                    UploadedBy = userId
                };
                await _processFilesService.AddFileAsync(processFile);
            }

            return Ok();
        }

        [HttpGet("DownloadProcessFile/{fileId}")]
        public async Task<ActionResult> DownloadFile(Guid fileId)
        {
            var file = await _processFilesService.GetFileByIdAsync(fileId);
            if (file == null)
            {
                return NotFound();
            }

            var absolutePath = Path.Combine(_env.WebRootPath, "uploads", "processes", file.ProcessId.ToString(), file.FileName);

            if (!System.IO.File.Exists(absolutePath))
            {
                return NotFound();
            }

            var memory = new MemoryStream();
            using (var stream = new FileStream(absolutePath, FileMode.Open, FileAccess.Read))
            {
                await stream.CopyToAsync(memory);
            }
            memory.Position = 0;
            return File(memory, file.MimeType, file.FileName);
        }

        [HttpGet("GetAllProcessFiles/{processId}/files")]
        public async Task<ActionResult<List<ProcessFileModel>>> GetAllFilesByProcessId(Guid processId)
        {
            var files = await _processFilesService.GetAllFilesByProcessIdAsync(processId);

            return Ok(files);
        }

        [HttpGet("GetProcessFileByName/{processId}/{fileName}")]
        public async Task<ActionResult<bool>> GetFileByName(Guid processId, string fileName)
        {
            var file = await _processFilesService.GetFileByName(processId, fileName);

            if (file == null)
            {
                return Ok(false);
            }

            return Ok(true);
        }

        [HttpDelete("DeleteProcessFile/{fileId}/files")]
        public async Task<ActionResult> DeleteFile(Guid fileId)
        {
            var file = await _processFilesService.GetFileByIdAsync(fileId);
            if (file == null)
            {
                return NotFound();
            }
            var absolutePath = Path.Combine(_env.WebRootPath, "uploads", "processes", file.ProcessId.ToString(), file.FileName);

            if (System.IO.File.Exists(absolutePath))
            {
                System.IO.File.Delete(absolutePath);
            }
            await _processFilesService.DeleteFileAsync(fileId);
            return NoContent();
        }
    }
}
