using System.Collections.Generic;
using StudentWebAPI.Model;

namespace StudentWebAPI.Repository
{
    public interface IProcessGrades
    {
        void AddOrUpdate(List<Grade> grades);
        IList<Grade> Get();
    }
}