const env = process().env;

if (!env.NEXMO_KEY || !env.NEXMO_SECRET || !env.NEXMO_VIRTUAL_NUMBER) {
  emit('apiError');
  cancel('Missing API key');
}

const sendMessage = require('../../lib/send_message')(env);
const prop = require('../../lib/prop');
const trace = require('../../lib/trace');

// Set timestamp to now
this.timestamp = Date.now();

// Grab fields from newly inserted record
const { to, message, taskId } = this;

// Get contact by message.to
const contactPromise = dpd.contacts.get({id: to});
const taskPromise = dpd.tasks.get({id: taskId});

// Declare some helper functions
const getUserIdFromContact = () => contactPromise.then(prop('userId'));
const updateTasksLog = tenantId => dpd.taskslog.post({ taskId, dateAssigned: Date.now(), tenantId });
const getDetails = ([{phoneNumber}, {details}]) => [phoneNumber, details];

// Send message and then update taskslog
Promise.all([contactPromise, taskPromise])
    .then(getDetails)
    .then(sendMessage)
    .then(getUserIdFromContact)
    .then(updateTasksLog)
    .catch(trace('Message error:'));

