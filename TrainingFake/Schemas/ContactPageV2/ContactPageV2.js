define("ContactPageV2", [], function() {
	return {
		entitySchemaName: "Contact",
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
		businessRules: /**SCHEMA_BUSINESS_RULES*/{}/**SCHEMA_BUSINESS_RULES*/,
		methods: {
			/**
			 * @inheritdoc Terrasoft.BasePageV2#init
			 * @overridden
			 */
			init: function(){
				this.callParent(arguments);
			},
			/**
			 * @inheritdoc Terrasoft.BasePageV2#onEntityInitialized
			 * @overridden
			 * @protected
			 */
			onEntityInitialized: function() {
				this.callParent(arguments);
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
					"Caption": {"bindTo": "Resources.Strings.actionOneTagCaption"},
					"Click": {"bindTo": "onActionClick"},
					"Visible": {"bindTo": "getIsAction1Visible"},
					ImageConfig: this.get("Resources.Images.CreatioSquare"),
				}));
				actionMenuItems.addItem(this.getButtonMenuItem({
					"Tag": "action2",
					"Caption": {"bindTo": "Resources.Strings.actionTwoTagCaption"},
					"Click": {"bindTo": "onActionClick"},
					"Visible": {"bindTo": "getIsAction1Visible"},
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
					"Caption": "SubI tem1",
					"Click": {"bindTo": "onActionClick"},
					"Tag": "sub2"
				}));
				collection.addItem(this.getButtonMenuItem({
					"Caption": "SubI tem1",
					"Click": {"bindTo": "onActionClick"},
					"Tag": "sub1"
				}));
				return collection;
			},


			/**BUTTONS */
			onMyMainButtonClick: function(){

				var tag = arguments[3];
				this.showInformationDialog("Red button clicked with tag " + tag);
			},
			

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