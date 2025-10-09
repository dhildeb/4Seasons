const fastify = require('fastify');
const cors = require('@fastify/cors');
const env = require('@fastify/env');

const schema = {
  type: 'object',
  required: ['PORT'],
  properties: {
    PORT: { type: 'string', default: '5000' },
    HOST: { type: 'string', default: '0.0.0.0' },
    NODE_ENV: { type: 'string', default: 'development' },
    FRONTEND_URL: { type: 'string', default: 'http://localhost:3000' },
    LOG_LEVEL: { type: 'string', default: 'info' }
  }
};

async function buildApp(opts = {}) {
  const app = fastify({
    logger: {
      level: process.env.LOG_LEVEL || 'info',
      transport: process.env.NODE_ENV === 'development' 
        ? {
            target: 'pino-pretty',
            options: {
              translateTime: 'HH:MM:ss Z',
              ignore: 'pid,hostname'
            }
          }
        : undefined
    },
    ...opts
  });

  // Register env plugin
  await app.register(env, {
    schema,
    dotenv: true
  });

  // Register CORS
await app.register(cors, {
  origin: (origin, callback) => {
    const allowedOrigins = [
      'https://effective-space-winner-p6q95755rv9crr7v-3000.app.github.dev',
      'http://localhost:3000',
      'http://localhost:3001', // if you run Next.js on different port
      app.config.FRONTEND_URL
    ];
    
    // Allow requests with no origin (like mobile apps, Postman, curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
})
  // Register routes
  await app.register(require('./routes/api'), { prefix: '/api' });

  // Health check
  app.get('/health', async (request, reply) => {
    return { 
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    };
  });

  // 404 handler
  app.setNotFoundHandler((request, reply) => {
    reply.code(404).send({
      statusCode: 404,
      error: 'Not Found',
      message: 'Route not found'
    });
  });

  // Error handler
  app.setErrorHandler((error, request, reply) => {
    app.log.error(error);
    
    reply.code(error.statusCode || 500).send({
      statusCode: error.statusCode || 500,
      error: error.name || 'Internal Server Error',
      message: error.message || 'Something went wrong'
    });
  });

  return app;
}

module.exports = buildApp;