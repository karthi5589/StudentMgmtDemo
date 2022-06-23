namespace StudentWebAPI.Model
{
    public class StudentScore
    {
        public int GradeId { get; set; }
        public string GradeName { get; set; }
        public int SubjectId { get; set; }
        public string SubjectName { get; set; }
        public string Score { get; set; }
    }
}