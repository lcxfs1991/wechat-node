const fastify = require('fastify');
const chat = require('./chat');
const message = require('./message');

const server = fastify({
  logger: {
    level: 'info',
  },
});

server.register(chat, { prefix: '/api' });
server.register(message, { prefix: '/api' });

const start = async () => {
  try {
    await server.listen(3000, '0.0.0.0');
    server.log.info(`server listening on ${server.server.address().port}`);
  } catch (err) {
    server.log.error(err);
    // process.exit(1);
  }
};
start();
