module.exports = (nga, admin) => {
  const user = nga.entity('users');

  const fields = [
    nga.field('username')
    .validation({
      required: true,
    }),
    nga.field('password'),
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
