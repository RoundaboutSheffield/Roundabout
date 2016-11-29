module.exports = (nga, admin) => {
  const taskLog = nga.entity('taskslog');

  const fields = [
    nga.field('taskId', 'reference')
      .targetEntity(nga.entity('tasks'))
      .targetField(nga.field('taskName'))
      .isDetailLink(true),
    nga.field('tenantId', 'reference')
      .targetEntity(nga.entity('users'))
      .targetField(nga.field('username')),
    nga.field('dateAssigned', 'datetime')
      .format('dd-MM-yyyy HH:mm:ss'),
    nga.field('tenantReplyReceived'),
    nga.field('completionValidatedByAdmin'),
  ];


  taskLog.listView()
    .fields(fields)
    .filters(fields);

  taskLog.editionView()
    .fields(fields);

  admin.addEntity(taskLog);

  dpd.on('apiError', () => {
    // eslint-disable-next-line no-alert
    alert('Error: Nexmo key missing. See project readme for correct way to execute application');
  });

  return taskLog;
};
