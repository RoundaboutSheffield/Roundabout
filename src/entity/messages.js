module.exports = (nga, admin) => {
  const message = nga.entity('messages');

  message.listView()
    .fields([
      nga.field('to'),
      nga.field('message')
    ]);

  message.creationView()
    .fields([
      nga.field('to', 'reference_many')
        .targetEntity(nga.entity('contacts'))
        .targetField(nga.field('fullName')),
      nga.field('message', 'text')
    ]);

  admin.addEntity(message);
};
