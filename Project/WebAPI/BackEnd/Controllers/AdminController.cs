using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using StudentWebAPI.Model;
using StudentWebAPI.Repository;
using StudentWebAPI.Wrapper;

namespace StudentWebAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IProcessGrades _processGrades;
        private readonly IProcessScores _processScores;
        private const string JsonFileContentFormatType = "application/json";
        private const string CsvFileContentFormatType = "text/csv";

        public AdminController(IProcessGrades processGrades, IProcessScores processScores)
        {
            _processGrades = processGrades;
            _processScores = processScores;
        }

        [HttpPost]
        public IActionResult ImportGrades([FromForm] IFormFile file)
        {
            if (file.ContentType != JsonFileContentFormatType)
            {
                return BadRequest("Invalid File Type (Please import JSON type).");
            }

            var fileContent = FileWrapper.ConvertToString(file);
            var gradesAndSubject = FileWrapper.StringToJArray(fileContent);
            var grades = ConvertToGrades(gradesAndSubject);
            if (grades == null || grades.Count == 0)
            {
                return BadRequest("Input file is Invalid/No Records found.");
            }

            _processGrades.AddOrUpdate(grades);
            return Ok();
        }

        [HttpPost]
        public IActionResult ImportScores([FromForm] IFormFile file)
        {
            if (file.ContentType != CsvFileContentFormatType && file.ContentType != "application/vnd.ms-excel")
            {
                return BadRequest("Invalid File Type (Please import CSV type).");
            }

            var fileContent = FileWrapper.ConvertToString(file);
            var scores = ConvertToScores(fileContent);
            if (scores == null || scores.Count == 0)
            {
                return BadRequest("Input file is Invalid/No Records found.");
            }

            _processScores.AddOrUpdate(scores);
            return Ok();
        }

        private static List<Grade> ConvertToGrades(JArray gradesList)
        {
            var grades = new List<Grade>();

            foreach (var item in gradesList)
            {
                try
                {
                    var grade = item.ToObject<Grade>();

                    if (grade != null)
                    {
                        grades.Add(grade);
                    }
                }
                catch (Exception)
                {
                    return null;
                }
            }

            return grades;
        }

        private static List<StudentScore> ConvertToScores(string fileContent)
        {
            var scores = new List<StudentScore>();
            try
            {
                var isHeader = true;
                foreach (var row in fileContent.Split('\n'))
                {
                    var rows = row.Replace('\r', ' ').Trim().Split(',');
                    if (isHeader)
                    {
                        isHeader = false;
                        continue;
                    }

                    scores.Add(new StudentScore
                    {
                        GradeId = Convert.ToInt32(rows[0]),
                        SubjectId = Convert.ToInt32(rows[1]),
                        Score = rows[2]
                    });
                }
            }
            catch (Exception)
            {
                return null;
            }

            return scores;
        }
    }
}