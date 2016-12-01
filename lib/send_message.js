const Nexmo = require('nexmo');


// Define message sending function
const sendMessage = (nexmo, fromNumber) => ([toNumber, message]) =>
  new Promise((resolve, reject) =>
    nexmo.message.sendSms(fromNumber, toNumber, message, (error, result) =>
      (error
        ? reject(error)
        : resolve(result))));


const provisionSendMessage = ({ NEXMO_KEY, NEXMO_SECRET, NEXMO_VIRTUAL_NUMBER, DEBUG }) =>
  sendMessage(
    new Nexmo({ apiKey: NEXMO_KEY, apiSecret: NEXMO_SECRET }, { debug: DEBUG }),
    NEXMO_VIRTUAL_NUMBER);

module.exports = provisionSendMessage;
