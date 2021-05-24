namespace Terrasoft.Core.Process.Configuration
{

	using Newtonsoft.Json;
	using Newtonsoft.Json.Linq;
	using System;
	using System.Collections.Generic;
	using System.Collections.ObjectModel;
	using System.Globalization;
	using Terrasoft.Common;
	using Terrasoft.Core;
	using Terrasoft.Core.Configuration;
	using Terrasoft.Core.DB;
	using Terrasoft.Core.Entities;
	using Terrasoft.Core.Process;
	using Terrasoft.UI.WebControls.Controls;
	using TrainingAPI;

	#region Class: ProcessUserTask_MyBusinessLogic

	/// <exclude/>
	public partial class ProcessUserTask_MyBusinessLogic
	{

		#region Methods: Protected

		protected override bool InternalExecute(ProcessExecutingContext context) {
			var myBl = Factories.ClassFactory.Get<IMyBusinessLogic>("MyDefaultImplementation");
			switch (mathod)
			{
				case "add":
					result = (decimal)myBl.Add((double)a, (double)b);
					break;
				case "sub":
					result = (decimal)myBl.Sub((double)a, (double)b);
					break;
				default:
					break;
			};

			return true;
		}

		#endregion

		#region Methods: Public

		public override bool CompleteExecuting(params object[] parameters) {
			return base.CompleteExecuting(parameters);
		}

		public override void CancelExecuting(params object[] parameters) {
			base.CancelExecuting(parameters);
		}

		public override string GetExecutionData() {
			return string.Empty;
		}

		public override ProcessElementNotification GetNotificationData() {
			return base.GetNotificationData();
		}

		#endregion

	}

	#endregion

}

