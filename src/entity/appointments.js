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
      .format('dd-MM-yyyy HH:mm:ss')
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
      nga.field('title'),
      nga.field('to', 'reference_many')
        .targetEntity(nga.entity('contacts'))
        .targetField(nga.field('fullName')),
      nga.field('date', 'datetime')
        .format('dd-MM-yyyy HH:mm:ss'),
      nga.field('sent'),
    ])
    .filters(fields);

  appointment.creationView().fields(fields);

  appointment.editionView().fields(fields);

  admin
    .addEntity(appointment);

  return appointment;
};
