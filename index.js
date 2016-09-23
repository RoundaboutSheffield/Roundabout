require('env2')('./config.env');

const deployd = require('deployd');
const options = {
  port: process.env.PORT || 8080,
  db: {
    connectionString: process.env.MONGODB_URI || 'mongodb://localhost:27017',
  },
};

const dpd = deployd(options);

dpd.listen();
