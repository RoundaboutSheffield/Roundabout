
console.log('running cron job from jollyendpoint - due to friking dpd that doesnt allow a query to contacts from cron.');

let prop = (propName) => (value) => (obj) => {
    return (obj[propName] === value)? [obj]:false }


Promise.all([ dpd.users.get(), dpd.taskslog.get(), dpd.contacts.get()])
.then( res => { 
    let tenants = res[0].filter(prop('isAdmin')(false)),
        logs = res[1].filter(prop('completionValidatedByAdmin')(true)),
        contacts = res[2];
        
        tenants.forEach(el=>{
            let tenantId =  contacts.filter(prop('userId')(el.id))[0].id
             
            let totalPoints = logs.filter(prop('tenantId')(tenantId))
                .filter(prop('tenantReplyReceived')(true))
                .filter(prop('completionValidatedByAdmin')(true))
                .reduce((acc, taskCompletedVerified) => {
                    return acc + taskCompletedVerified.points
                }, 0);
                dpd.users.put({id:el.id, points:totalPoints}).then(res=>console.log('record updated'))
        })
                
        return [tenants, logs, contacts]
})
/*.then(res => {
    console.log('tenant', res[0]);
    console.log( 'log', res[1]); 
    console.log('contacts', res[2])})*/
.catch((err) => console.log(err))
