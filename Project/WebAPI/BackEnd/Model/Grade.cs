using System.Collections.Generic;

namespace StudentWebAPI.Model
{
    public class Grade
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<Subject> Subjects { get; set; }
    }
}