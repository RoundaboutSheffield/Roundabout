/* global emit, cancel */
const Nexmo = require('nexmo');

const apiKey = process.env.NEXMO_KEY;
const apiSecret = process.env.NEXMO_SECRET;
const debug = process.env.DEBUG;
const fromNumber = process.env.NEXMO_VIRTUAL_NUMBER;

if (!apiKey || !apiSecret || !fromNumber) {
  emit('apiError');
  cancel('Missing API key');
}

// Setup Nexmo connection
const nexmo = new Nexmo({ apiKey, apiSecret }, { debug });

// Define message sending function
const sendMessage = message => toNumber =>
  new Promise((resolve, reject) =>
    nexmo.message.sendSms(fromNumber, toNumber, message, (error, result) =>
      (error
        ? reject(error)
        : resolve(result))));

module.exports = sendMessage;
