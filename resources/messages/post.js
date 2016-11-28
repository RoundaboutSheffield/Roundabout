const Nexmo = require('nexmo');
console.log(process().env)
const apiKey = process().env.NEXMO_KEY;
const apiSecret = process().env.NEXMO_SECRET;
const debug = process().env.DEBUG;
const senderNumber = '447507329934';

if (!apiKey || !apiSecret){
  emit('apiError')
  cancel('Missing API key')
}

const nexmo = new Nexmo({ apiKey, apiSecret }, { debug });
const { from, to, message, task } = this; //make sure you get task

this.timestamp = Date.now();

dpd.contacts.get({id: {$in:to} })
  .then(contacts => contacts.map(contact => contact.phoneNumber))
  .then(phoneNumbers => {
    phoneNumbers.forEach(phone =>
      nexmo.message.sendSms(senderNumber, phone, message, {debug:true}, ()=>{}));
  })
  .then((res)=>{
    console.log('here', from, to, message, this)
    console.log('message was sent')
  })
  .then(()=>dpd.users.get({number: to}))
  .then((res)=>{
    console.log(res);
    let { id, username } = res[0]
    return dpd.taskslog.post({task: task, dateAssigned:Date.now(), tenantId: id, tenantName: username})
  })
  .then( res => console.log(res) )
  .catch( e => console.log(e) )

this.userId = me.id;
