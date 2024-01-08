const mongoose = require('mongoose');

const mongoDBConnection = () => {
  mongoose.connect(process.env.mongoDB_URI, { dbName: 'ecommerce' }).then((data) => {
    console.log(`Database is connected with ${data.connection.host}`);
  });
};

module.exports = mongoDBConnection;
