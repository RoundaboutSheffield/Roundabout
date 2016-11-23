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
      nga.field('phoneNumber'),
    ])
    .filters(fields);

  contact.creationView().fields(fields);

  contact.editionView().fields(fields);

  admin
    .addEntity(contact);

  return contact;
};
