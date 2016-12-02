/* global emit, cancel */
const env = process().env;

if (!env.NEXMO_KEY || !env.NEXMO_SECRET || !env.NEXMO_VIRTUAL_NUMBER) {
  emit('apiError');
  cancel('Missing API key');
}

// Set timestamp to now
this.timestamp = Date.now();

// Grab fields from newly inserted record
const { to, taskId } = this;

const prop = require('../../lib/prop');
const trace = require('../../lib/trace');
const zeroFill = require('../../lib/zero_fill');
const sendMessage = require('../../lib/send_message')(env);

// Declare helper functions
const getNextInc = res =>
  (res.length === 0
    ? dpd.tasklogid.post({ nextId: 1 }).then(prop('nextId'))
    : dpd.tasklogid.put({ id: res[0].id, nextId: { $inc: 1 } }).then(prop('nextId')));

const getNextUid = () =>
  dpd.tasklogid.get({ $limit: 1 })
    .then(getNextInc)
    .then(zeroFill)
    .then(trace('result::'));


const run = () => {
  // Declare promises (so can be re-used, which limits db connections)
  const contactPromise = dpd.contacts.get({ id: to });
  const taskPromise = dpd.tasks.get({ id: taskId });
  const nextUidPromise = getNextUid();

  // Declare some helper functions
  const updateTasksLog = ([tenantId, uid]) =>
    dpd.taskslog.post({ taskId, dateAssigned: Date.now(), tenantId, uid });

  const getTasksLogDetails = ([{ userId }, uid]) =>
    [userId, uid];

  const getMessageData = ({ uid }) =>
    Promise.all([
      Promise.resolve(uid),
      contactPromise.then(prop('phoneNumber')),
      taskPromise.then(prop('details')),
    ]);

  const buildMessage = (message, uid) =>
    `${message}\nWhen it's done reply #${uid} DONE`;

  Promise.all([contactPromise, nextUidPromise])
    .then(getTasksLogDetails)
    .then(updateTasksLog)
    .then(getMessageData)
    .then(([uid, phoneNumber, message]) => [phoneNumber, buildMessage(message, uid)])
    .then(sendMessage)
    .catch(trace('error:'));
};

run();
