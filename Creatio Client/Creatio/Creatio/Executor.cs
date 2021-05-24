using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Creatio.Library
{
	internal class Executor
	{
		public Executor(IHttpClientFactory httpFactory, ConnectionOption config, ILogger<Executor> logger)
		{
			HttpFactory = httpFactory;
			Config = config;
			Logger = logger;
			Client = HttpFactory.CreateClient("creatio");
		}
		public IHttpClientFactory HttpFactory { get; }
		public ConnectionOption Config { get; }
		public ILogger<Executor> Logger { get; }
		public HttpClient Client { get; }

		public async Task<HttpResponseMessage> ExecuteRequest(HttpRequestMessage request)
		{
			try
			{
				HttpResponseMessage responseMessage = await Client.SendAsync(request);
				responseMessage.EnsureSuccessStatusCode();

				if(!Client.DefaultRequestHeaders.TryGetValues("BPMCSRF", out var value))
				{
					GetBPMCSRFCookieValue(responseMessage);
				}
				return responseMessage;
			}
			catch (Exception ex)
			{
				Logger.LogError(ex.Message);
			}
			return new HttpResponseMessage();
		}
		private void GetBPMCSRFCookieValue(HttpResponseMessage response)
		{
			if (response?.Headers?.Count() > 0)
			{
				response.Headers.TryGetValues("Set-Cookie", out var newCookies);
				foreach (string s in newCookies)
				{
					if (s.StartsWith("BPMCSRF"))
					{
						var value = s.Split(';')[0].Split('=')[1];
						Client.DefaultRequestHeaders.Add("BPMCSRF", value);
					}
				}
			}
		}
	}
}
