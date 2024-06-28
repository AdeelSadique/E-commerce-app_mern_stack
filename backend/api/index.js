const app = require('./app');
const dotenv = require('dotenv');
const mongoDBConnection = require('./config/DB');
// uncaught exception handling
process.on('uncaughtException', (err) => {
  console.log(`Error: ${err.message}`);
  console.log('Shutting down the server due to uncaught exception');

  process.exit(1);
});

dotenv.config({ path: 'config/config.env' });

mongoDBConnection();

const server = app.listen(process.env.PORT, () => {
  console.log(`server is running on ${process.env.PORT}`);
});

// unHandled rejection handling database
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  console.log('Shutting down the server due to unHandled Promise Exception');

  server.close(() => {
    process.exit(1);
  });
});
