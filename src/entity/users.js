module.exports = (nga, admin) => {
  const user = nga.entity('users');

  const fields = [
    nga.field('username')
    .validation({
      required: true,
    }),
    nga.field('password', 'password'),
    nga.field('isAdmin', 'boolean')
      .choices([
          { value: true, label: 'true' },
          { value: false, label: 'false' },
      ]),
  ];

  user
    .listView()
    .fields([
      nga.field('username')
        .isDetailLink(true),
    ])
    .filters(fields);

  user.creationView().fields(fields);

  user.editionView().fields(fields);

  admin
    .addEntity(user);

  return user;
};
