module.exports = (nga, admin) => {
  const appointment = nga.entity('appointments');

  const fields = [
    nga.field('title'),
    nga.field('to', 'reference_many')
      .targetEntity(nga.entity('contacts'))
      .targetField(nga.field('fullName'))
      .validation({
        required: true,
      }),
    nga.field('date', 'datetime')
      .validation({
        required: true,
      }),
    nga.field('message', 'text')
      .validation({
        required: true,
      }),
  ];

  appointment
    .listView()
    .fields([
      nga.field('id'),
      ...fields,
    ])
    .filters(fields);

  appointment.creationView().fields(fields);

  appointment.editionView().fields(fields);

  admin
    .addEntity(appointment);

  return appointment;
};
