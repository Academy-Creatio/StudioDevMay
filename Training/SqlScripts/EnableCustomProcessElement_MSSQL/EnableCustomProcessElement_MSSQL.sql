insert into SysProcessUserTask(SysUserTaskSchemaUId, Caption)
select s.UId, s.Caption from SysSchema s
where s.Name = 'ProcessUserTask_MyBusinessLogic'