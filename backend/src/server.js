const buildApp = require('./app');

async function start() {
  const app = await buildApp();

  try {
    const address = await app.listen({
      port: app.config.PORT,
      host: app.config.HOST
    });
    
    app.log.info(`Server listening on ${address}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM signal received: closing HTTP server');
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT signal received: closing HTTP server');
  process.exit(0);
});

start();