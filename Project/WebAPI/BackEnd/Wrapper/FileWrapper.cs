using System.IO;
using System.Net.Http.Headers;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json.Linq;

namespace StudentWebAPI.Wrapper
{
    public static class FileWrapper
    {
        public static string ConvertToString(IFormFile file)
        {
            var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName;

            if (fileName != null)
            {
                using var stream = file.OpenReadStream();
                using var reader = new StreamReader(stream);
                var fileContents = reader.ReadToEnd();
                return fileContents;
            }

            return null;
        }

        public static JArray StringToJArray(string content)
        {
            return JArray.Parse(content);
        }
    }
}