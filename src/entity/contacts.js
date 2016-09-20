module.exports = (nga, admin) => {
  const contact = nga.entity('contacts');

  const fields = [
    nga.field('name')
      .validation({
        required: true,
      }),
    nga.field('lastName'),
    nga.field('phoneNumber')
      .validation({
        required: true,
      }),
  ];

  contact
    .listView()
    .fields([
      nga.field('id'),
      ...fields,
    ])
    .filters(fields);

  contact.creationView().fields(fields);

  contact.editionView().fields(fields);

  admin
    .addEntity(contact);

  return contact;
};
