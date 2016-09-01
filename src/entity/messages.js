module.exports = (nga, admin) => {
  const message = nga.entity('messages');

  message.listView()
    .fields([
      nga.field('id'),
      nga.field('from'),
      nga.field('message'),
      nga.field('timestamp', 'datetime')
        .label('Date')
        .format('dd-MM-yyyy HH:mm:ss')
    ]);

  message.creationView()
    .fields([
      nga.field('from'),
      nga.field('to', 'reference_many')
        .targetEntity(nga.entity('contacts'))
        .targetField(nga.field('fullName'))
        .validation({
          required: true
        }),
      nga.field('message', 'text')
        .validation({
          required: true
        }),
    ]);

  message.showView()
    .fields([
      nga.field('from'),
      nga.field('to', 'reference_many')
        .targetEntity(nga.entity('contacts'))
        .targetField(nga.field('fullName'))
        .singleApiCall(ids => ({'id': ids })),
      nga.field('timestamp', 'datetime')
        .label('Date')
        .format('dd-MM-yyyy HH:mm:ss'),
      nga.field('message', 'text')
    ]);

  admin.addEntity(message);

  return message;
};
