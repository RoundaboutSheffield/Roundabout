module.exports = (nga, admin) => {
  const task = nga.entity('taskslog');

  const fields = [
    nga.field('tasksName'),
    nga.field('tenantName'),
    nga.field('dateAssigned'),
    nga.field('tenantReplyReceived'),
    nga.field('completionValidateByAdmin'),
  ];


  task.listView()
    .fields([
      nga.field('taskName'),
      nga.field('tenantName'),
      nga.field('dateAssigned', 'datetime')
      .format('dd-MM-yyyy HH:mm:ss'),
      nga.field('tenantReplyReceived'),
      nga.field('completionValidatedByAdmin'),
    ])
    .filters(fields);

  admin.addEntity(task);

  dpd.on('apiError', () => {
    // eslint-disable-next-line no-alert
    alert('Error: Nexmo key missing. See project readme for correct way to execute application');
  });

  return task;
};
