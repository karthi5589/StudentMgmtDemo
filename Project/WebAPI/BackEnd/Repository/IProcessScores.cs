using System.Collections.Generic;
using StudentWebAPI.Model;

namespace StudentWebAPI.Repository
{
    public interface IProcessScores
    {
        void AddOrUpdate(List<StudentScore> grades);
        IList<StudentScore> Get();
    }
}