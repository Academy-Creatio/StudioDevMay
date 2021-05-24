using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Creatio.Library
{
	internal class LogIn
	{
		private const string ContentType = "application/json";
		private const string relativeUrl = "/ServiceModel/AuthService.svc/Login";

		public LogIn(ConnectionOption config, ILogger<LogIn> logger, Executor executor)
		{
			Config = config;
			Logger = logger;
			Executor = executor;
		}
		private Executor Executor { get; }
		private ConnectionOption Config { get; }
		private ILogger Logger { get; }

		public async Task<bool> TryLogInAsync()
		{
			Uri loginUri = new Uri(Config.BaseUri, relativeUrl);
			var request = new HttpRequestMessage(HttpMethod.Post, loginUri);
			var obj = new
			{
				UserName = Config.UserName,
				UserPassword = Config.UserPassword
			};
			request.Content = new StringContent(System.Text.Json.JsonSerializer.Serialize(obj), Encoding.UTF8, ContentType);
			HttpResponseMessage response = await Executor.ExecuteRequest(request);
			string content = await response?.Content.ReadAsStringAsync();

			Logger.LogInformation(content);
			return true;
		}

		
	}
}
