const phonePattern = /\+44[1-9]\d{7,10}$/;   // eslint-disable-line no-useless-escape

module.exports = (nga, admin) => {
  const contact = nga.entity('contacts');

  const fields = [
    nga.field('firstName')
      .validation({
        required: true,
      }),
    nga.field('lastName'),
    nga.field('phoneNumber')
      .validation({
        required: true,
        pattern: phonePattern,
      }),
    nga.field('userId', 'reference')
      .targetEntity(nga.entity('users'))
      .targetField(nga.field('username')),
  ];

  contact
    .listView()
    .fields([
      nga.field('fullName')
        .isDetailLink(true),
      nga.field('phoneNumber')
      .validation({
        required: true,
        pattern: phonePattern,
      }),
    ])
    .filters(fields);

  contact.creationView().fields(fields);

  contact.editionView().fields(fields);

  admin
    .addEntity(contact);

  return contact;
};
