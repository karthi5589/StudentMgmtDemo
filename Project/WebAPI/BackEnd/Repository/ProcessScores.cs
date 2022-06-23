using System.Collections.Generic;
using Microsoft.Extensions.Caching.Memory;
using StudentWebAPI.Enum;
using StudentWebAPI.Model;

namespace StudentWebAPI.Repository
{
    public class ProcessScores : IProcessScores
    {
        private readonly IMemoryCache _memoryCache;
        private const CacheMemoryKeyEnum Key = CacheMemoryKeyEnum.Scores;

        public ProcessScores(IMemoryCache memoryCache)
        {
            _memoryCache = memoryCache;
        }

        public void AddOrUpdate(List<StudentScore> scores)
        {
            if (_memoryCache.TryGetValue(Key, out _))
            {
                _memoryCache.Remove(Key);
            }
            _memoryCache.Set(Key, scores);
        }

        public IList<StudentScore> Get()
        {
            if (_memoryCache.TryGetValue(Key, out List<StudentScore> scores))
            {
                return scores;
            }

            return null;
        }
    }
}