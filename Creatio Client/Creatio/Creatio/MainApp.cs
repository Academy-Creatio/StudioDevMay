using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Terrasoft.Nui.ServiceModel.DataContract;

namespace Creatio.Library
{
	public class MainApp
	{
		IHost host;
		public MainApp()
		{
			Configure();
		}
		private void Configure()
		{
			var connectionConfig = new ConfigurationBuilder()
				.SetBasePath(Directory.GetCurrentDirectory())
				.AddJsonFile("appsettings.json", optional: true)
				.Build();

			CookieContainer cookieContainer = new CookieContainer();

			var builder = new HostBuilder()
				.ConfigureLogging(logging =>
				{
					logging.ClearProviders();
					logging.AddConsole();
				})
				.ConfigureServices((hostContext, services) =>
				{
					ConnectionOption appVars = connectionConfig.GetSection("connectionOption").Get<ConnectionOption>();
					services.AddSingleton(appVars);
					services.AddHttpClient("creatio", c =>
					{
						c.BaseAddress = appVars.BaseUri;
						c.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
					})
					.ConfigurePrimaryHttpMessageHandler(() => new HttpClientHandler
					{
						AllowAutoRedirect = false,
						AutomaticDecompression = DecompressionMethods.Deflate | DecompressionMethods.GZip,
						UseCookies = true,
						CookieContainer = cookieContainer
					});
					services.AddTransient<LogIn>();
					services.AddSingleton<Executor>();
					services.AddTransient<DataService>();
				})
				.UseConsoleLifetime();
			host = builder.Build();
		}
		public async Task LogIn()
		{
			using (var serviceScope = host.Services.CreateScope())
			{
				var services = serviceScope.ServiceProvider;
				try
				{
					var loginService = services.GetRequiredService<LogIn>();
					await loginService.TryLogInAsync();
				}
				catch (Exception ex)
				{
					Console.WriteLine($"Error Occured\n{ex.Message}");
				}
			}
		}
		public async Task<string> ExecuteQuery<Query>(Query querry) where Query : BaseQuery
		{
			string content = string.Empty;
			if(querry != null)
			{
				using (var serviceScope = host.Services.CreateScope())
				{
					var services = serviceScope.ServiceProvider;
					try
					{
						var dataService = services.GetRequiredService<DataService>();
						content = await dataService.ExecuteQuery(querry);
					}
					catch (Exception ex)
					{
						Console.WriteLine($"Error Occured\n{ex.Message}");
					}
				}
			}
			return content;
		}
	}
}