using Terrasoft.Core.Factories;
using TrainingAPI;

namespace Training.Files.cs.MyBusinessLogic
{


	[DefaultBinding(typeof(IMyBusinessLogic), Name ="MyDefaultImplementation")]
	public class MyBusinessLogic : IMyBusinessLogic
	{
		public double Add(double x, double y)
		{
			var conf = Terrasoft.Core.Factories.ClassFactory.Get<IConfToClio>();
			conf.PostMessageToAll(GetType().Name, "WebSocket Messaege from clio through Configuration");
			return x + y;

		}

		public double Sub(double x, double y)
		{
			var conf = Terrasoft.Core.Factories.ClassFactory.Get<IConfToClio>();
			conf.PostMessageToAll(GetType().Name, "WebSocket Messaege from clio through Configuration");
			return x - y;
		}
	}
	
	[DefaultBinding(typeof(IMyBusinessLogic), Name ="MySecondImplementation")]
	public class MyBusinessLogic2 : IMyBusinessLogic
	{
		public double Add(double x, double y)
		{
			var conf = Terrasoft.Core.Factories.ClassFactory.Get<IConfToClio>();
			conf.PostMessageToAll(GetType().Name, "WebSocket Messaege from clio through Configuration");
			return x + y+100;
		}

		public double Sub(double x, double y)
		{
			var conf = Terrasoft.Core.Factories.ClassFactory.Get<IConfToClio>();
			conf.PostMessageToAll(GetType().Name, "WebSocket Messaege from clio through Configuration");
			return x - y-100;
		}
	}
}
