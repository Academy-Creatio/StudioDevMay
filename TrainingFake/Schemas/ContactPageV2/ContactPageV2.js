define("ContactPageV2", ["ServiceHelper","ProcessModuleUtilities", "DevTrainingMixin"], 
	function(ServiceHelper, ProcessModuleUtilities) {
	return {
		entitySchemaName: "Contact",
		mixins: {
			"DevTrainingMixin": "Terrasoft.DevTrainingMixin"
		},
		attributes: {
			"Account": {
				lookupListConfig: {
					columns: ["Owner", "Country", "Owner.Email", "Country.Name"]
				}
			},
			"myEvents": {
				dependencies: [
					{
						columns: ["Name"],
						methodName: "onNameChanged"
					},
					{
						columns: ["Email"],
						methodName: "onEmailChanged"
					}
				]
			},
		},
		modules: /**SCHEMA_MODULES*/{}/**SCHEMA_MODULES*/,
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		messages: {

			//Published on: ContactSectionV2
			"SectionActionClicked":{
				mode: this.Terrasoft.MessageMode.PTP,
				direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
			}
		},
		businessRules: /**SCHEMA_BUSINESS_RULES*/{}/**SCHEMA_BUSINESS_RULES*/,
		methods: {
			/**
			 * @inheritdoc Terrasoft.BasePageV2#init
			 * @overridden
			 */
			init: function(){
				this.callParent(arguments);
				this.subscribeToMessages();
			},
			/**
			 * @inheritdoc Terrasoft.BasePageV2#onEntityInitialized
			 * @overridden
			 * @protected
			 */
			onEntityInitialized: function() {
				this.callParent(arguments);
				debugger;
			},

			onNameChanged: function(){
				this.showInformationDialog("Name has changed to: "+this.$Name);
			},
			onEmailChanged: function(){
				this.showInformationDialog("Email changed to: "+this.$Email);
			},
			
			/**
			 * @inheritdoc Terrasoft.BasePageV2#getActions
			 * @overridden
			 */
			 getActions: function() {
				var actionMenuItems = this.callParent(arguments);
				actionMenuItems.addItem(this.getButtonMenuSeparator());
				actionMenuItems.addItem(this.getButtonMenuItem({
					"Tag": "action1",
					//"Caption": {"bindTo": "Resources.Strings.ActionOneCaption"},
					"Caption": "Action 1",
					"Click": {"bindTo": "callCustomProcess"},
					ImageConfig: this.get("Resources.Images.CreatioSquare"),
				}));
				actionMenuItems.addItem(this.getButtonMenuItem({
					"Tag": "action2",
					//"Caption": {"bindTo": "Resources.Strings.ActionTwoCaption"},
					"Caption": "Action 2",
					"Click": {"bindTo": "onActionClick"},
					"Items": {"bindTo": "addSubItems"}
				}));
				return actionMenuItems;
			},
			onActionClick: function(){
				var tag = arguments[0];
				if(tag){
					this.showInformationDialog("Action with "+tag+" tag was clicked");
				}
			},
			getIsAction1Visible: function(){
				return true;
			},
			addSubItems: function(){
				var collection = this.Ext.create("Terrasoft.BaseViewModelCollection");
				collection.addItem(this.getButtonMenuItem({
					"Caption": "Sub Item 1",
					"Click": {"bindTo": "onActionClick"},
					"Tag": "sub1"
				}));
				collection.addItem(this.getButtonMenuItem({
					"Caption": "Sub Item 2",
					"Click": {"bindTo": "onActionClick"},
					"Tag": "sub2"
				}));
				return collection;
			},
			/**BUTTONS */
			onMyMainButtonClick: function(){

				var tag = arguments[3];
				this.showInformationDialog("Red button clicked with tag " + tag);
			},
			subscribeToMessages: function(){
				this.sandbox.subscribe(
					"SectionActionClicked",
					function(){this.onSectionMessageReceived();},
					this,
					[this.sandbox.id]
				)
			},
			onSectionMessageReceived: function(){
				var yB = this.Terrasoft.MessageBoxButtons.YES;
				yB.style = "GREEN";

				var nB = this.Terrasoft.MessageBoxButtons.NO;
				nB.style = "RED";


				this.showConfirmationDialog(
					"ARE YOU SURE YOU WANT TO PERFORM THIS ACTION",
					function(returnCode) {
						if (returnCode === this.Terrasoft.MessageBoxButtons.NO.returnCode) {
							return;
						}
						//this.doESQ();
						this.serviceExample();
					},
					[
						yB.returnCode,
						nB.returnCode
					],
					null
				);
			},
			doESQ: function() {
				var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {rootSchemaName: "Account"});

				esq.addColumn("Id");
				esq.addColumn("Name");
				esq.addColumn("Industry");
				esq.addColumn("AlternativeName");

				var esqFirstFilter = esq.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL, "Country.Name", "Mexico");
				var esqSecondFilter = esq.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL, "Country.Id", "e0be1264-f36b-1410-fa98-00155d043204");

				esq.filters.logicalOperation = Terrasoft.LogicalOperatorType.OR;
				esq.filters.add("esqFirstFilter", esqFirstFilter);
				esq.filters.add("esqSecondFilter", esqSecondFilter);

				var i = 0;

				esq.getEntityCollection(
					function (result) {
						if (!result.success) {
							// error processing/logging, for example
							this.showInformationDialog("Data query error");
							return;
						}
						result.collection.each(
							function (item) {
								i++;
								var name = name + " "+item.$Name;
								window.console.log(name)
						});
						this.showInformationDialog("Total Accounts: " + i);
					},
					this
				);




			},
			serviceExample: function(){
				var serviceData = {
					PersonName: "",
					PersonAge :40
				};

				// Calling the web service and processing the results.
				//https://[appName].domaincom/0/rest/ClassName/PostMethodName
				ServiceHelper.callService(
					"DemoService", 
					"PostMethodName",
					function(response) {
						this.showInformationDialog(response.PersonName+" is "+ response.PersonAge);
					}, 
					serviceData, 
					this);
			},

			callCustomProcess: function(){
				
				//https://academy.creatio.com/docs/developer/integrations_and_api/processengineservice/processengineservice?_ga=2.3506422.772349606.1622122733-2062963899.1599201789#case-1934
				var args = {

					sysProcessName: "Process_863daeb",
					parameters: {
						recordId: this.$Id
					}
				}
				ProcessModuleUtilities.executeProcess(args);
			}
		},
		dataModels: /**SCHEMA_DATA_MODELS*/{}/**SCHEMA_DATA_MODELS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "Name",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 3,
						"layoutName": "ContactGeneralInfoBlock"
					},
					"bindTo": "Name"
				},
				"parentName": "ContactGeneralInfoBlock",
				"propertyName": "items",
				"index": 6
			},



			/** BUTTONS IN THE LEFT CONTAINER */
			{
				"operation": "insert",
				"name": "PrimaryContactButtonRed",
				"parentName": "LeftContainer",
				"propertyName": "items",
				"values":{
					"itemType": this.Terrasoft.ViewItemType.BUTTON,
					"style": Terrasoft.controls.ButtonEnums.style.RED,
					classes: {
						"textClass": ["actions-button-margin-right"],
						"wrapperClass": ["actions-button-margin-right"]
					},
					"caption": {"bindTo": "Resources.Strings.MyRedBtnCaption"},
					"hint": {"bindTo": "Resources.Strings.MyRedBtnHint"},
					"click": {"bindTo": "onMyMainButtonClick"},
					tag: "LeftContainer_Red"
				}
			},
			{
				"operation": "insert",
				"name": "MyGreenButton",
				"parentName": "LeftContainer",
				"propertyName": "items",
				"values":{
					// "layout": {
					// 	"column": 12,
					// 	"row": 3
					// },
					"itemType": this.Terrasoft.ViewItemType.BUTTON,
					"style": Terrasoft.controls.ButtonEnums.style.GREEN,
					classes: {
						"textClass": ["actions-button-margin-right"],
						"wrapperClass": ["actions-button-margin-right"]
					},
					"caption": {"bindTo": "Resources.Strings.MyRedBtnCaption"},
					"hint": {"bindTo": "Resources.Strings.MyRedBtnHint"},
					"click": {"bindTo": "onMyMainButtonClick"},
					tag: "ContactGeneralInfoBlock_Green",
					"menu":{
						"items": [
							{
								caption: "Sub Item 1",
								click: {bindTo: "onMySubButtonClick"},
								visible: true,
								hint: "Sub item 1 hint",
								tag: "subItem1"
							},
							{
								caption: "Sub Item 2",
								click: {bindTo: "onMySubButtonClick"},
								visible: true,
								hint: "Sub item 2 hint",
								tag: "subItem2"
							}
						]
					}
				}
			},
			
		]/**SCHEMA_DIFF*/
	};
});