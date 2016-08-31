  var myApp = angular.module('myApp', ['ng-admin']);
  myApp.config(['NgAdminConfigurationProvider', function(NgAdminConfigurationProvider) {
      var nga = NgAdminConfigurationProvider;
      // create an admin application
      var admin = nga.application('My First Admin');

      var message = nga.entity('messages');

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

      var contact = nga.entity('contacts');

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
        .addEntity(message)
        .addEntity(contact);

      nga.configure(admin);
  }]);

