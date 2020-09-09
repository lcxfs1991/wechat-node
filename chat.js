const fs = require('fs-extra');

module.exports = (server, options, next) => {
  server.route({
    method: 'GET',
    url: '/',
    handler: async (request, reply) => {
      reply.send('wx');
    },
  });

  server.route({
    method: 'POST',
    url: '/get_chat_list',
    handler: async (request, reply) => {
      try {
        let uid = request.body.uid || '2';

        let data = JSON.parse(fs.readFileSync('./data/data.json', 'utf-8'));

        if (data.hasOwnProperty(uid)) {
          reply.send({
            code: 0,
            msg: 'ok',
            data: data[uid],
          });
        } else {
          reply.send({
            code: 1,
            msg: 'error',
            data: {},
          });
        }
      } catch (e) {
        reply.send({
          code: 1,
          msg: e.message,
          data: {},
        });
      }
    },
  });

  // server.route({
  //   method: 'POST',
  //   url: '/get_message_list',
  //   handler: async (request, reply) => {},
  // });
  next();
};
