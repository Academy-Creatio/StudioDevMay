define("ContactSectionV2", [], function() {
	return {
		entitySchemaName: "Contact",
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				// The operation of adding a component to the page is in progress..
				"operation": "insert",
				// The meta name of the parent container to which the button is added.
				"parentName": "CombinedModeActionButtonsCardLeftContainer",
				// The button is added to the parent component's collection.
				"propertyName": "items",
				// The meta-name of the button to be added.
				"name": "MainContactSectionButton",
				// Properties passed to the component's constructor.
				"values": {
					// The type of the component to add is the button.
					itemType: Terrasoft.ViewItemType.BUTTON,
					style: Terrasoft.controls.ButtonEnums.style.RED,
					classes: {
						"textClass": ["actions-button-margin-right"],
						"wrapperClass": ["actions-button-margin-right"]
					},
					// Bind the button header to the localizable string of the schema.
					caption: "My Section Button",
					// Bind the button click handler method.
					click: { bindTo: "sendMessageToPage" },
					// Binding the button availability property.
					//enabled: { bindTo: "isAccountPrimaryContactSet" },
					// Setting the location of the button.
					layout: {
						"column": 1,
						"row": 6,
						"colSpan": 1
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "ActionButtonsContainer",
				"propertyName": "items",
				"name": "MainContactSectionButton",
				"values": {
					itemType: Terrasoft.ViewItemType.BUTTON,
					style: Terrasoft.controls.ButtonEnums.style.GREEN,
					classes: {
						"textClass": ["actions-button-margin-right"],
						"wrapClass": ["left-container-wrapClass"],
					},
					caption: "SECTION ABC",
					click: { bindTo: "onSectionButtonClick" },
					tag: "ActionButtonsContainer"
				}
			}
		]/**SCHEMA_DIFF*/,
		messages: {

			//Subscribed on: ContactPageV2
			"SectionActionClicked":{
				mode: this.Terrasoft.MessageMode.PTP,
				direction: this.Terrasoft.MessageDirectionType.PUBLISH
			}
		},
		methods: {
			
			/**
			 * @inheritdoc Terrasoft.BasePageV2#init
			 * @overridden
			 */
			 init: function(){
				this.callParent(arguments);
			},

			getSectionActions: function() {
				var actionMenuItems = this.callParent(arguments);
				actionMenuItems.addItem(this.getButtonMenuItem({Type: "Terrasoft.MenuSeparator",Caption: ""}));
				actionMenuItems.addItem(this.getButtonMenuItem({
					"Caption": "Page Action Item One",
					"Click": {bindTo: "onActionClick"},
					"Enabled": true,
					"Tag": "Item1"
				}));
				actionMenuItems.addItem(this.getButtonMenuItem({
					"Caption": "Page Action Item Two",
					"Click": {bindTo: "onActionClick"},
					"Enabled": true,
					"Tag": "Item2",
					"Items": {"bindTo": "addSubItems"}
				}));
				return actionMenuItems;
			},
			addSubItems: function() {
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
			onActionClick: function(){
				let tag = arguments[0];

				//use tag to handle button clicks
				// if(tag){
				// 	this.showInformationDialog("Button with tag: "+tag+" clicked");
				// }



			},
			sendMessageToPage: function(){
				this.sandbox.publish("SectionActionClicked", "message body", [this.sandbox.id+"_CardModuleV2"])
			}
		}
	};
});
