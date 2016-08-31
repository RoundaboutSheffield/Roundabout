module.exports = (nga, admin) => {
  const contact = nga.entity('contacts');

  contact.listView()
    .fields([
      nga.field('name'),
      nga.field('lastName'),
      nga.field('phoneNumber'),
      nga.field('isKeyWorker')
    ]);

  contact.creationView()
    .fields([
      nga.field('name'),
      nga.field('lastName'),
      nga.field('phoneNumber'),
      nga.field('isKeyWorker', 'boolean')
    ]);

  admin
    .addEntity(contact);

};
