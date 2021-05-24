using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Terrasoft.Core;

namespace TrainingAPI
{
	public interface IConfToClio
	{
		void PostMessage(UserConnection userConnection, string senderName, string messageText);
		void PostMessageToAll(string senderName, string messageText);
	}
}
