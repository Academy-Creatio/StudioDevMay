insert into public."SysProcessUserTask"("SysUserTaskSchemaUId", "Caption")
select "s"."UId", "s"."Caption" from public."SysSchema" "s"
where "s"."Name" = 'ProcessUserTask_MyBusinessLogic'