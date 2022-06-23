using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using StudentWebAPI.Repository;

namespace StudentWebAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly IProcessScores _processScore;
        private readonly IProcessGrades _processGrade;

        public StudentController(IProcessScores processScore, IProcessGrades processGrade)
        {
            _processScore = processScore;
            _processGrade = processGrade;
        }

        [HttpGet]
        public IActionResult GetStudentScores([FromQuery] List<int> selectedSubIds)
        {
            var scores = _processScore.Get();
            if (scores == null)
            {
                return NotFound("Student score data not fount.");
            }

            var selectedScore = selectedSubIds.Select(id =>
                scores.FirstOrDefault(x => x.SubjectId == id))
                .Where(studentScore => studentScore != null).ToList();

            var grades = _processGrade.Get();


            foreach (var score in selectedScore)
            {
                foreach (var grade in grades)
                {
                    foreach (var sub in grade.Subjects.Where(sub => score.SubjectId == sub.Id))
                    {
                        score.GradeName = grade.Name;
                        score.SubjectName = sub.Name;
                        break;
                    }
                }
            }

            return Ok(selectedScore);
        }
    }
}
