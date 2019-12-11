const webServer = require('./services/web-server.js');
const database = require('./services/database.js');
const dbConfig = require('./config/database.js');
const defaultThreadPoolSize = 4;

// Increase thread pool size by poolMax
process.env.UV_THREADPOOL_SIZE = dbConfig.defaultPool.poolMax + defaultThreadPoolSize;

async function startup() {
  console.log('Starting application');

  try {
    console.log('Initializing database module');

    await database.initialize();
  } catch (err) {
    console.log('Error Initializing database module');
    console.error(err);

    process.exit(1); // Non-zero failure code
  }

  try {
    console.log('Initializing web server module');

    await webServer.initialize();
  } catch (err) {
    console.error(err);

    process.exit(1); // Non-zero failure code
  }
}

startup();

async function shutdown(e) {
  let err = e;

  console.log('Shutting down application');

  try {
    console.log('Closing database module');

    await database.close();
  } catch (e) {
    console.error(e);

    err = err || e;
  }

  try {
    console.log('Closing web server module');

    await webServer.close();
  } catch (e) {
    console.error(e);

    err = err || e;
  }

  

  console.log('Exiting process');

  if (err) {
    process.exit(1); // Non-zero failure code
  } else {
    process.exit(0);
  }
}

process.stdin.resume();//so the program will not close instantly

  // do app specific cleaning before exiting
  process.on('exit', function () {
    console.log('Received exit');

    shutdown();
  });

process.on('SIGTERM', () => {
  console.log('Received SIGTERM');

  shutdown();
});

process.on('SIGINT', () => {
  console.log('Received SIGINT, Ctrl-C...');

  shutdown();
});

process.on('uncaughtException', err => {
  console.log('Uncaught exception');
  console.error(err);

  shutdown(err);
});
