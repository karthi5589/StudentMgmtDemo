using System.Collections.Generic;
using Microsoft.Extensions.Caching.Memory;
using StudentWebAPI.Enum;
using StudentWebAPI.Model;

namespace StudentWebAPI.Repository
{
    public class ProcessGrades : IProcessGrades
    {
        private readonly IMemoryCache _memoryCache;
        private const CacheMemoryKeyEnum Key = CacheMemoryKeyEnum.Grades;

        public ProcessGrades(IMemoryCache memoryCache)
        {
            _memoryCache = memoryCache;
        }

        public void AddOrUpdate(List<Grade> grades)
        {
            if (_memoryCache.TryGetValue(Key, out _))
            {
                _memoryCache.Remove(Key);
            }
            _memoryCache.Set(Key, grades);
        }

        public IList<Grade> Get()
        {
            if (_memoryCache.TryGetValue(Key, out List<Grade> grades))
            {
                return grades;
            }

            return null;
        }
    }
}