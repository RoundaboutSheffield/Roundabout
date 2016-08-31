const Nexmo = require('nexmo');
const path = require('path');

const apiKey = process.env.NEXMO_KEY;
const apiSecret = process.env.NEXMO_SECRET;
const debug = process.env.DEBUG;

const nexmo = new Nexmo({apiKey, apiSecret}, {debug});
const { to, message } = this;

Promise.all(to.map(id => dpd.contacts.get(id)))
    .then(contacts =>
        contacts.forEach(contact =>
            nexmo.message.sendSms('NEXMO', contact.phoneNumber, message))
    )
