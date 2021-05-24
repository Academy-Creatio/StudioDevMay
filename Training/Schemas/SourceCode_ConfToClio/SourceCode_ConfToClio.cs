using Terrasoft.Core;
using Terrasoft.Core.Factories;
using TrainingAPI;

namespace Training
{
	[DefaultBinding(typeof(IConfToClio))]
	public class ConfToClio : IConfToClio
	{
		public void PostMessageToAll(string senderName, string messageText)
		{
			Terrasoft.Configuration.MsgChannelUtilities.PostMessageToAll(senderName, messageText);
		}

		public void PostMessage(UserConnection userConnection, string senderName, string messageText)
		{
			Terrasoft.Configuration.MsgChannelUtilities.PostMessage(userConnection, senderName, messageText);
		}

	}
}