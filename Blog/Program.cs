using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace Blog
{
    public class Program
    {
        public static void Main(string[] args)
        {
            Configuration = new ConfigurationBuilder().SetBasePath(Environment.CurrentDirectory)
                                 .AddJsonFile("appsettings.json")
                                 .Build();
            CreateHostBuilder(args).Build().Run();
        }

        public static IConfigurationRoot Configuration { get; private set; }

        public static IWebHostBuilder CreateHostBuilder(string[] args)
        {
            return WebHost.CreateDefaultBuilder(args)
                .UseUrls(Configuration["url"])
                .UseStartup<Startup>();
        }
    }
}
