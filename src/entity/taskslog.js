module.exports = (nga, admin) => {
  const task = nga.entity('taskslog');

  task.listView()
    .fields([
      nga.field('taskName'),
      nga.field('tenantReplyReceived'),
      nga.field('completionValidatedByAdmin')
    ]);



    admin.addEntity(task);

    dpd.on('apiError', () => {
      // eslint-disable-next-line no-alert
      alert('Error: Nexmo key missing. See project readme for correct way to execute application');
    });

    return task;
};
