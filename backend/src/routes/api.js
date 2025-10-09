const axios = require('axios');
const _ = require('lodash');

async function apiRoutes(fastify, options) {
  // GET endpoint example
  fastify.get('/data', async (request, reply) => {
    const { query } = request;
    
    fastify.log.info({ query }, 'GET /api/data called');
    
    return {
      status: 'success',
      message: 'Data retrieved successfully',
      data: { query }
    };
  });

  // POST endpoint example
  fastify.post('/data', {
    schema: {
      body: {
        type: 'object',
        required: ['name'],
        properties: {
          name: { type: 'string' },
          email: { type: 'string', format: 'email' }
        }
      }
    }
  }, async (request, reply) => {
    const { body } = request;
    
    fastify.log.info({ body }, 'POST /api/data called');
    
    // Example using lodash
    const sanitizedData = _.pick(body, ['name', 'email']);
    
    return {
      status: 'success',
      message: 'Data received successfully',
      data: sanitizedData
    };
  });

  // Example with axios (proxy/external API call)
  fastify.get('/external/:id', async (request, reply) => {
    const { id } = request.params;
    
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
      
      return {
        status: 'success',
        data: response.data
      };
    } catch (error) {
      fastify.log.error(error);
      throw new Error('Failed to fetch external data');
    }
  });

  // Example with authentication/encryption (using crypto-js)
  fastify.post('/secure', async (request, reply) => {
    const CryptoJS = require('crypto-js');
    const { data } = request.body;
    
    const encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(data), 
      process.env.SECRET_KEY || 'default-secret-key'
    ).toString();
    
    return {
      status: 'success',
      encrypted
    };
  });
}

module.exports = apiRoutes;