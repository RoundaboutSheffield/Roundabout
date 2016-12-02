//first call to comose must pass the functions. second call the initial value
let compose = (...args) => (value) => args.reverse().reduce((acc, nextFn) => nextFn(acc), value ) 

let str= query.text
let hashtagPos = (str) => str.indexOf('#')
let number = (hashtagPos) => str.substring(hashtagPos + 1, hashtagPos + 6)
let strip0 = (strNumber) => strNumber.split('').filter(el => el != 0) 

let nextId = compose(String, number, hashtagPos)(str)

console.log('nextId: ', typeof nextId, nextId)

dpd.taskslog.get({uid: nextId})
.then( (el) => { console.log(el[0].id); return el[0].id })
.then( id => dpd.taskslog.put({ id: id, tenantReplyReceived: true } ) )
.then( (a) => console.log(a) )
.catch( (err) => console.log(err) )
