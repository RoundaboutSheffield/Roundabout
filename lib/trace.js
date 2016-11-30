// eslint-disable-next-line no-console
const trace = desc => (data) => { console.log(desc, data); return data; };

module.exports = trace;
