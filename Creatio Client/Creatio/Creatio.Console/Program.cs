using Creatio.Library;
using System;
using System.Threading.Tasks;
using Terrasoft.Nui.ServiceModel.DataContract;

namespace Creatio.Console
{
	class Program
	{
		protected Program()
		{

		}
		static async Task<int> Main(string[] args)
		{
			var app = new MainApp();
			await app.LogIn();

			string s = await app.ExecuteQuery(CreateRequestQuery());
			string s = await app.ExecuteQuery(CreateInsertQuery());
			System.Console.WriteLine(s);


			if (Guid.TryParse("feef7fc8-7ca6-448f-951c-80659aaf2bf5", out Guid id))
			{
				string result = await app.ExecuteQuery(CreateSelectContactByIdQuery(id));
				System.Console.WriteLine(result);
			}

			return 0;
		}
		private static InsertQuery CreateInsertQuery()
		{
			return new InsertQuery
			{
				RootSchemaName = "Contact",
				IncludeProcessExecutionData = false,
				QueryKind = Terrasoft.Common.QueryKind.General,
				ColumnValues = new ColumnValues
				{
					Items = new System.Collections.Generic.Dictionary<string, ColumnExpression>
					{
						{"Name", new ColumnExpression
							{
								ExpressionType = Terrasoft.Core.Entities.EntitySchemaQueryExpressionType.Parameter,
								Parameter = new Parameter
								{
									DataValueType = DataValueType.Text,
									Value = "Contact from External Application"
								}
							}
						},
						{"Email", new ColumnExpression
							{
								ExpressionType = Terrasoft.Core.Entities.EntitySchemaQueryExpressionType.Parameter,
								Parameter = new Parameter
								{
									DataValueType = DataValueType.Text,
									Value = "test@mydomain.com"
								}
							}
						}
					}
				}
			};
		}
		private static SelectQuery CreateRequestQuery()
		{
			return new SelectQuery
			{
				RootSchemaName = "Contact",
				AllColumns = true,
				UseLocalization = false,
			};
		}
		private static SelectQuery CreateSelectContactByIdQuery(Guid id)
		{
			if(id == Guid.Empty )
			{
				throw new ArgumentOutOfRangeException(nameof(id), "id must be a vlid Guid");
			}
			return new SelectQuery
			{
				RootSchemaName = "Contact",
				IncludeProcessExecutionData = false,
				QueryKind = Terrasoft.Common.QueryKind.General,
				Columns = new SelectQueryColumns
				{
					Items = new System.Collections.Generic.Dictionary<string, SelectQueryColumn>
					{
						{"Name", new SelectQueryColumn
							{
								Expression = new ColumnExpression
								{
									ColumnPath = "Name"
								}
							}
						},
						{"Email", new SelectQueryColumn
							{
								Expression = new ColumnExpression
								{
									ColumnPath = "Email"
								}
							}
						}
					}
				},
				Filters = new Filters
				{
					Items = new System.Collections.Generic.Dictionary<string, Filter>
					{
						{"ById", new Filter
							{
								FilterType = FilterType.CompareFilter,
								ComparisonType = Terrasoft.Core.Entities.FilterComparisonType.Equal,
								LeftExpression = new BaseExpression
								{
									ExpressionType = Terrasoft.Core.Entities.EntitySchemaQueryExpressionType.SchemaColumn,
									ColumnPath = "Id"
								},
								RightExpression = new BaseExpression
								{
									ExpressionType = Terrasoft.Core.Entities.EntitySchemaQueryExpressionType.Parameter,
									Parameter = new Parameter
									{
										DataValueType = DataValueType.Guid,
										Value = id
									}
								}
							} 
						},
						
					},
					LogicalOperation = Terrasoft.Common.LogicalOperationStrict.And,
					FilterType = FilterType.FilterGroup,
					IsEnabled = true
				}
				
			};
		}

	}
}
