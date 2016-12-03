const allFields = fields => Object.keys(fields).map(k => fields[k]);
const withoutFields = (excludes, fields) =>
  Object.keys(fields).filter(k => excludes.every(v => k !== v)).map(k => fields[k]);

module.exports = (nga, admin) => {
  const taskLog = nga.entity('taskslog');

  const fields = {
    id: nga.field('uid')
      .isDetailLink(true),

    taskId: nga.field('taskId', 'reference')
      .targetEntity(nga.entity('tasks'))
      .targetField(nga.field('taskName'))
      .isDetailLink(true),

    tenantId: nga.field('tenantId', 'reference')
      .targetEntity(nga.entity('contacts'))
      .targetField(nga.field('fullName')),

    dateAssigned: nga.field('dateAssigned', 'datetime')
      .format('dd-MM-yyyy HH:mm:ss'),

    tenantReplyReceived: nga.field('tenantReplyReceived', 'boolean')
      .choices([
          { value: true, label: 'true' },
          { value: false, label: 'false' },
      ]),

    completionValidatedByAdmin: nga.field('completionValidatedByAdmin', 'boolean')
      .choices([
          { value: true, label: 'true' },
          { value: false, label: 'false' },
      ]),
  };


  taskLog.listView()
    .fields(allFields(fields))
    .filters(allFields(fields));

  taskLog.editionView()
    .fields(withoutFields(['dateAssigned'], fields));

  admin.addEntity(taskLog);

  dpd.on('apiError', () => {
    // eslint-disable-next-line no-alert
    alert('Error: Nexmo key missing. See project readme for correct way to execute application');
  });

  return taskLog;
};
