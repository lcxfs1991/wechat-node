const Mock = require('mockjs');
const { writeFileSync } = require('fs-extra');

Mock.Random.extend({
  gendar: function (date) {
    let gendar = [0, 1];
    return this.pick(gendar);
  },
});

let data = Mock.mock({
  // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
  'list|100-100': [
    {
      // 属性 id 是一个自增数，起始值为 1，每次增 1
      'id|+1': 1,
      name: '@cname',
      //   alias: '@cfirst@clast',
      region: '@area',
      gendar: '@gendar',
      //   avatar: 'https://static.docschina.org/avatar/@{id}.jpeg',
    },
  ],
});
// 输出结果
// console.log(JSON.stringify(data, null, 4));

count = 5;
data.list = data.list.map((item, index) => {
  item.avatar = `https://static.docschina.org/avatar/${index + 1}.jpeg`;
  item.region = Mock.Random.city(true);
  if (item.name.length === 2 && count && item.name[0] !== '李') {
    item.name = '李' + item.name;
    --count;
  }

  item.alias = item.name;
  item.wechat_id =
    `wxid_` +
    Mock.Random.string('abcdefghijklmnopqrstuvwxyz0123456789', 14, 14);
  return item;
});

data.list.shift();
data.list.shift();

data.list.unshift(
  {
    id: '1',
    name: '李瑶',
    alias: '李瑶',
    wechat_id: 'Jenny_yaoyao620',
    gendar: 0,
    region: '广东 广州',
    avatar: 'https://static.docschina.org/avatar/1.jpeg',
  },
  {
    id: '2',
    name: 'Faye李苑菲',
    alias: '李苑菲',
    wechat_id: 'lyfaye0o_o0',
    gendar: 0,
    region: '广东 广州',
    avatar: 'https://static.docschina.org/avatar/2.jpeg',
  }
);

console.log(Mock.Random.image('360x360'));
// console.log(data);

// writeFileSync('./da/ta/initcontact.json', JSON.stringify(data.list, null, 4));
