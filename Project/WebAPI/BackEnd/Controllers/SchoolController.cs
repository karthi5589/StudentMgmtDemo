using Microsoft.AspNetCore.Mvc;
using StudentWebAPI.Repository;

namespace StudentWebAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class SchoolController : ControllerBase
    {
        private readonly IProcessGrades _processGrades;

        public SchoolController(IProcessGrades processGrades)
        {
            _processGrades = processGrades;
        }

        [HttpGet]
        public IActionResult GetAllGradesAndSubjects()
        {
            var grades = _processGrades.Get();

            if (grades == null)
            {
                return NotFound("Grades and subjects data not fount.");
            }

            return Ok(grades);
        }
    }
}