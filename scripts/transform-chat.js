const { readFileSync, writeFileSync } = require('fs-extra');

let data = require('../data/initchat.json');
let user = require('../data/initcontact-transformed.json');

const findUser = (id) => {
  for (let i = 0, len = user.length; i < len; i++) {
    if (user[i].id === id) {
      return user;
    }
  }
};

data = data['2'].map((item) => {
  //   let user = item.avatar.map((id) => {
  //     return findUser(id);
  //   });

  let d = {
    mid: item.id,
    type: item.is_group ? 'group' : 'friend',
    group_name: item.is_group ? item.title : '',
    group_qrCode: '',
    read: false,
    newMsgCount: item.msg_count,
    quiet: item.is_silent,
    msg: [
      {
        text: item.last_message,
        name: item.last_person,
        date: item.last_time,
        headerUrl: '',
      },
    ],
    user: [],
  };
  return d;
});

// console.log(JSON.stringify(data, null, 4));
writeFileSync(
  './data/initchat-transformed.json',
  JSON.stringify(data, null, 4)
);
