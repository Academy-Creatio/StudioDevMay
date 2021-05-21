using System;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.ServiceModel.Web;
using Terrasoft.Core;
using Terrasoft.Core.DB;
using Terrasoft.Web.Common;

namespace Training
{
	[ServiceContract]
	[AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Required)]
	public class DemoService : BaseService
	{
		#region Properties
		private SystemUserConnection _systemUserConnection;
		private SystemUserConnection SystemUserConnection
		{
			get
			{
				return _systemUserConnection ?? (_systemUserConnection = (SystemUserConnection)AppConnection.SystemUserConnection);
			}
		}
		#endregion

		#region Methods : REST
		[OperationContract]
		[WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, 
			BodyStyle = WebMessageBodyStyle.Bare, ResponseFormat = WebMessageFormat.Json)]
		public DemoDto GetMethodName(DemoDto person)
		{
			//http://k_krylov:7050/0/rest/DemoService/GetMethodName
			//UserConnection userConnection = UserConnection ?? SystemUserConnection;


			return new DemoDto
			{
				Age = person.Age+10,
				Name = person.Name+" Krylov"
			};
		}

		#endregion

		#region Methods : Private

		#endregion
	}



	[DataContract]
	public class DemoDto
	{
		[DataMember(Name="PersonName")]
		public string Name { get; set; }

		[DataMember(Name="PersonAge")]
		public int Age { get; set; }
	}
}
