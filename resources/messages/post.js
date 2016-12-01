const sendMessage = require('../../lib/send_message');
const prop = require('../../lib/prop');
const trace = require('../../lib/trace');

// Set timestamp to now
this.timestamp = Date.now();

// Grab fields from newly inserted record
const { to, message, taskId } = this;

// Get contact by message.to
const contactPromise = dpd.contacts.get({id: to});

const getUserIdFromContact = () => contactPromise.then(prop('userId'));
const updateTasksLog = tenantId => dpd.taskslog.post({ taskId, dateAssigned: Date.now(), tenantId });

contactPromise
  .then(prop('phoneNumber'))
  .then(sendMessage(message))
  .then(getUserIdFromContact)
  .then(updateTasksLog)
  .catch(trace('Message error:'));
