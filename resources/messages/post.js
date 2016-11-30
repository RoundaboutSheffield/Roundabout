const Nexmo = require('nexmo');
const apiKey = process().env.NEXMO_KEY;
const apiSecret = process().env.NEXMO_SECRET;
const debug = process().env.DEBUG;
const SENDER_NUMBER = process().env.NEXMO_VIRTUAL_NUMBER;

const nexmo = new Nexmo({ apiKey, apiSecret }, { debug });

if (!apiKey || !apiSecret){
  emit('apiError')
  cancel('Missing API key')
}

const noop = () => {};
const trace = desc => data => { console.log(desc, data); return data; };

const { to, message, id, taskId } = this; //make sure you get task

this.timestamp = Date.now();

dpd.contacts.get({id: to})
  .then(contact => {
    if (apiKey) {
      nexmo.message.sendSms(SENDER_NUMBER, contact.phoneNumber, 'wtf', { debug:true }, noop);
    }
    return contact.userId;
  })
  .then((userId) =>
    dpd.taskslog.post({taskId: taskId, dateAssigned: Date.now(), tenantId: userId }))
  .then(trace('Update taskslog success:'))
  .catch(trace('Update taskslog error:'));
