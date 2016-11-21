module.exports = (nga, admin) => {
  const task = nga.entity('tasks');

  task.listView()
    .fields([
      nga.field('taskName'),
      nga.field('details'),
      nga.field('inCollege'),
      nga.field('points'),
    ]);

  task.creationView()
    .fields([
      nga.field('taskName').validation({ required: true }),
      nga.field('points').validation({ required: true }),
      nga.field('inCollege', 'boolean'),
      nga.field('details', 'text').validation({ required: true }),
    ]);

  task.showView()
    .fields([
      nga.field('taskName').validation({ required: true }),
      nga.field('points').validation({ required: true }),
      nga.field('inCollege', 'boolean'),
      nga.field('details', 'text').validation({ required: true }),
    ]);

  admin.addEntity(task);

  dpd.on('apiError', () => {
    // eslint-disable-next-line no-alert
    alert('Error: Nexmo key missing. See project readme for correct way to execute application');
  });

  return task;
};
