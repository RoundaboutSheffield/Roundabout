require('ng-admin');

angular.module('myApp', ['ng-admin'])
  .config(['NgAdminConfigurationProvider', nga => {
      const admin = nga.application('My First Admin');

      require('./entity/messages')(nga, admin);
      require('./entity/contacts')(nga, admin);

      nga.configure(admin);
  }]);

