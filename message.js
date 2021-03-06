const fs = require('fs-extra');
const { getUserInfoById } = require('./util');

const deductArray = [1, 1, 2, 3, 4, 4, 5, 7, 9, 12, 0, 12, 12, 13];

module.exports = (server, options, next) => {
  server.route({
    method: 'POST',
    url: '/get_message_list',
    handler: async (request, reply) => {
      try {
        let mid = +request.body.mid || 11;
        let uid = request.body.uid || '2';
        let timestamp = request.body.timestamp;

        let data = JSON.parse(fs.readFileSync('./data/data.json', 'utf-8'));

        if (data.hasOwnProperty(uid)) {
          data[uid] = data[uid].map((item, index) => {
            if (item.mid === 11) {
              return item;
            }

            item.msg[item.msg.length - 1].date =
              timestamp - deductArray[index] * 60;

            return item;
          });
          let msg = data[uid];
          msg = msg.filter((item) => {
            if (item.mid === mid) {
              return true;
            }

            return false;
          });

          if (msg.length) {
            reply.send({
              code: 0,
              msg: 'ok',
              data: msg[0].msg,
            });
          } else {
            throw new Error('msg not found.');
          }
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

  server.route({
    method: 'POST',
    url: '/add_message',
    handler: async (request, reply) => {
      try {
        let from_uid = request.body.from_uid;
        let to_uid = request.body.to_uid;
        let mid = request.body.mid;
        let text = request.body.text;

        if (!text || !from_uid || !to_uid || !mid) {
          throw new Error('parameter missing');
        }

        let data = JSON.parse(fs.readFileSync('./data/data.json', 'utf-8'));

        let from_user = getUserInfoById(`${from_uid}`);

        data[from_uid] = data[from_uid].map((item) => {
          if (item.mid === mid) {
            item.msg.push({
              uid: from_uid,
              name: from_user.remark || from_user.nickname,
              text,
              date: Math.floor(Date.now() / 1000),
            });

            item.read = false;
            // 不需要给自己这边的新消息+1
            // ++item.newMsgCount;
          }
          return item;
        });

        data[to_uid] = data[to_uid].map((item) => {
          if (item.mid === mid) {
            item.msg.push({
              uid: from_uid,
              name: from_user.remark || from_user.nickname,
              text,
              date: Math.floor(Date.now() / 1000),
            });

            item.read = false;
            ++item.newMsgCount;
          }
          return item;
        });

        fs.writeFileSync('./data/data.json', JSON.stringify(data, null, 4));

        reply.send({
          code: 0,
          msg: 'ok',
          data: {},
        });
      } catch (e) {
        reply.send({
          code: 1,
          msg: e.message,
          data: {},
        });
      }
    },
  });

  server.route({
    method: 'POST',
    url: '/update_message',
    handler: async (request, reply) => {
      try {
        let from_uid = request.body.from_uid;
        let to_uid = request.body.to_uid;
        let mid = request.body.mid;
        let read = request.body.read || false;
        let newMsgCount = request.body.newMsgCount || 0;

        if (!from_uid || !to_uid || !mid) {
          throw new Error('parameter missing');
        }

        let data = JSON.parse(fs.readFileSync('./data/data.json', 'utf-8'));

        let from_user = getUserInfoById(`${from_uid}`);

        // 将两份冗余数据更新
        data[from_uid] = data[from_uid].map((item) => {
          if (item.mid === mid) {
            item.newMsgCount = newMsgCount;
            item.read = read;
          }
          return item;
        });

        // data[to_uid] = data[to_uid].map((item) => {
        //   if (item.mid === mid) {
        //     item.newMsgCount = newMsgCount;
        //     item.read = read;
        //   }
        //   return item;
        // });

        fs.writeFileSync('./data/data.json', JSON.stringify(data, null, 4));

        reply.send({
          code: 0,
          msg: 'ok',
          data: {},
        });
      } catch (e) {
        reply.send({
          code: 1,
          msg: e.message,
          data: {},
        });
      }
    },
  });

  next();
};
