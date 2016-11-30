module.exports = (nga, admin) => {
  const message = nga.entity('messages');

  message.listView()
  .fields([
    nga.field('id'),

    nga.field('to', 'reference')
    .targetEntity(nga.entity('contacts'))
    .targetField(nga.field('fullName')),

    nga.field('message'),

    nga.field('timestamp', 'datetime')
    .label('Date')
    .format('dd-MM-yyyy HH:mm:ss'),
  ]);

  message.creationView()
  .fields([
    nga.field('to', 'reference')
    .targetEntity(nga.entity('contacts'))
    .targetField(nga.field('fullName'))
    .validation({
      required: true,
    }),

    nga.field('taskId', 'reference')
    .targetEntity(nga.entity('tasks'))
    .targetField(nga.field('taskName')),

    nga.field('message', 'text')
    .validation({
      required: true,
    }),
  ]);

  message.showView()
  .fields([
    nga.field('to', 'reference')
    .targetEntity(nga.entity('contacts'))
    .targetField(nga.field('fullName')),

    nga.field('timestamp', 'datetime')
    .label('Date')
    .format('dd-MM-yyyy HH:mm:ss'),

    nga.field('message', 'text'),
  ]);

  admin.addEntity(message);

  dpd.on('apiError', () => {
    // eslint-disable-next-line no-alert
    window.alert(`Error: Nexmo key missing. See project readme for
      correct way to execute application`);
  });

  return message;
};
