using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Terrasoft.Nui.ServiceModel.DataContract;

namespace Creatio.Library
{
	internal class DataService
	{
		private const string ContentType = "application/json";
		private const string selectRelativeUrl = "/0/DataService/json/SyncReply/SelectQuery";
		private const string insertRelativeUrl = "/0/DataService/json/SyncReply/InsertQuery";
		private const string deleteRelativeUrl = "/0/DataService/json/SyncReply/DeleteQuery";
		private const string updateRelativeUrl = "/0/DataService/json/SyncReply/UpdateQuery";
		private readonly HttpRequestMessage request = new(HttpMethod.Post, "");

		public DataService(ConnectionOption config, Executor executor)
		{
			Config = config;
			Executor = executor;
		}
		private Executor Executor { get; }
		private ConnectionOption Config { get; }
		public async Task<string> ExecuteQuery<Query>(Query query) where Query : BaseQuery
		{
			request.RequestUri = GetRequestUri(query);
			request.Content = new StringContent(System.Text.Json.JsonSerializer.Serialize(query), Encoding.UTF8, ContentType);
			return await Execute();
		}
		private Uri GetRequestUri<Query>(Query query) where Query : BaseQuery
		{
			var obj = query as BaseFilterableQuery;
			string relativeUri = string.Empty;
			if (obj != null)
			{
				switch (obj.QueryType)
				{
					case QueryType.Select:
						relativeUri = selectRelativeUrl;
						break;
					case QueryType.Update:
						relativeUri = updateRelativeUrl;
						break;
					case QueryType.Delete:
						relativeUri = deleteRelativeUrl;
						break;
					default:
						break;
				}
			}
			else
			{
				relativeUri = insertRelativeUrl;
			}
			return new Uri(Config.BaseUri, relativeUri);
		}
		private async Task<string> Execute()
		{
			HttpResponseMessage response = await Executor.ExecuteRequest(request);
			string content = await response.Content.ReadAsStringAsync();
			return content;
		}
	}
}
