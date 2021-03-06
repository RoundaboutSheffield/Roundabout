// eslint-disable-next-line import/no-extraneous-dependencies
require('ng-admin');  // NOTE: ng-admin needs to be a dev dependency

const userEntity = require('./entity/users');
const messageEntity = require('./entity/messages');
const contactEntity = require('./entity/contacts');
// const appointmentEntity = require('./entity/appointments');
const tasksEntity = require('./entity/tasks');
const logsEntity = require('./entity/taskslog');
const headerTemplate = require('./header/header.js');


const app = angular.module('roundAbout', ['ng-admin'])
  .config(['NgAdminConfigurationProvider', (nga) => {
    const admin = nga.application('RoundAbout');

    const user = userEntity(nga, admin);
    const message = messageEntity(nga, admin);
    const contact = contactEntity(nga, admin);
    // const appointment = appointmentEntity(nga, admin);
    const tasks = tasksEntity(nga, admin);
    const logger = logsEntity(nga, admin);


    headerTemplate(nga, admin);
    nga.configure(admin);
    admin.menu(
      nga
      .menu()
      .addChild(nga.menu(user).icon('<span class="glyphicon glyphicon-user"></span>'))
      .addChild(nga.menu(contact).icon('<span class="glyphicon glyphicon-user"></span>'))
      .addChild(nga.menu(message).icon('<span class="glyphicon glyphicon-envelope"></span>'))
      // .addChild(nga.menu(appointment).icon('<span class="glyphicon glyphicon-calendar"></span>'))
      .addChild(nga.menu(tasks).icon('<span class="glyphicon glyphicon-calendar"></span>'))
      .addChild(nga.menu(logger).icon('<span class="glyphicon glyphicon-calendar"></span>')));
  }]);

require('./config/restangularConfig')(app);
require('./directives/logoutBtn')(app);
