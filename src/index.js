require('ng-admin');
const messageEntity = require('./entity/messages');
const contactEntity = require('./entity/contacts');
const appointmentEntity = require('./entity/appointments');
const headerTemplate = require('./header/header.js');

const app = angular.module('roundAbout', ['ng-admin'])
  .config(['NgAdminConfigurationProvider', nga => {
    const admin = nga.application('RoundAbout');

    const message = messageEntity(nga, admin);
    const contact = contactEntity(nga, admin);
    const appointment = appointmentEntity(nga, admin);

    const header = headerTemplate(nga, admin);

    nga.configure(admin);

    admin.menu(nga.menu()
        .addChild(nga.menu(contact).icon('<span class="glyphicon glyphicon-user"></span>'))
        .addChild(nga.menu(message).icon('<span class="glyphicon glyphicon-envelope"></span>'))
        .addChild(nga.menu(appointment).icon('<span class="glyphicon glyphicon-calendar"></span>'))
    );
  }]);

require('./config/serializeParams')(app);
require('./directives/logoutBtn')(app);


