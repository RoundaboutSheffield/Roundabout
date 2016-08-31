const moment = require('moment');

module.exports = (nga, admin) => {
  const message = nga.entity('messages');

  message.listView()
    .fields([
      nga.field('id'),
      nga.field('from'),
      nga.field('message'),
      nga.field('timestamp')
    ]);

  message.creationView()
    .fields([
      nga.field('from'),
      nga.field('to', 'reference_many')
        .targetEntity(nga.entity('contacts'))
        .targetField(nga.field('fullName')),
      nga.field('message', 'text')
    ]);

  message.showView()
    .fields([
      nga.field('from'),
      nga.field('to', 'reference_many')
        .targetEntity(nga.entity('contacts'))
        .targetField(nga.field('fullName'))
        .singleApiCall(ids => ({'id': ids })),
      nga.field('message', 'text')
    ]);

  admin.addEntity(message);
};
