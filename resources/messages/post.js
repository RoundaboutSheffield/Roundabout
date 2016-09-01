const Nexmo = require('nexmo');
const path = require('path');

const apiKey = process.env.NEXMO_KEY;
const apiSecret = process.env.NEXMO_SECRET;
const debug = process.env.DEBUG;

const nexmo = new Nexmo({apiKey, apiSecret}, {debug});
const { from, to, message } = this;

this.timestamp = Date.now();

Promise.all(to.map(id => dpd.contacts.get(id)))
    .then(contacts => contacts.map(contact => contact.phoneNumber))
    .then(phoneNumbers => {
        phoneNumbers.forEach(phone =>
            nexmo.message.sendSms(from, phone, message))
    })
