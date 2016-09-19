require('ng-admin');
const messageEntity = require('./entity/messages');
const contactEntity = require('./entity/contacts');

const app = angular.module('roundAbout', ['ng-admin'])
  .config(['NgAdminConfigurationProvider', nga => {
    const admin = nga.application('RoundAbout');

    const message = messageEntity(nga, admin);
    const contact = contactEntity(nga, admin);

    nga.configure(admin);

    admin.menu(nga.menu()
        .addChild(nga.menu(contact).icon('<span class="glyphicon glyphicon-user"></span>'))
        .addChild(nga.menu(message).icon('<span class="glyphicon glyphicon-envelope"></span>'))
    );
  }]);

require('./config/serializeParams')(app);
