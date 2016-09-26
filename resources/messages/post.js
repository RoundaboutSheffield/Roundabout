const Nexmo = require('nexmo');

const apiKey = process().env.NEXMO_KEY;
const apiSecret = process().env.NEXMO_SECRET;
const debug = process().env.DEBUG;

if (!apiKey || !apiSecret){
    emit('apiError')
    cancel('Missing API key')
}

const nexmo = new Nexmo({ apiKey, apiSecret }, { debug });
const { from, to, message } = this;

this.timestamp = Date.now();

dpd.contacts.get({id: {$in:to} })
  .then(contacts => contacts.map(contact => contact.phoneNumber))
  .then(phoneNumbers => {
    phoneNumbers.forEach(phone =>
      nexmo.message.sendSms(from, phone, message));
  });

this.userId = me && me.id || this.userId;