const { readFileSync, writeFileSync } = require('fs-extra');

let data = require('../data/initcontact-sorted.json');

data = data.map((item) => {
  let d = {
    id: item.id,
    wxid: item.wechat_id,
    initial: item.pinyin[0].toLowerCase(),
    headerUrl: item.avatar,
    nickname: item.name,
    sex: item.gendar,
    remark: item.alias,
    signature: '',
    telphone: 18896586152,
    album: [
      {
        imgSrc:
          'https://sinacloud.net/vue-wechat/images/album/baiqian/baiqian01.jpeg',
        date: 182625262,
      },
      {
        imgSrc:
          'https://sinacloud.net/vue-wechat/images/album/baiqian/baiqian02.jpeg',
        date: 182625262,
      },
    ],
    area: item.region.split(' '),
    from: '通过扫一扫',
    tag: '',
    desc: {
      title: '',
      picUrl: '',
    },
  };
  return d;
});

console.log(data);

writeFileSync(
  './data/initcontact-transformed.json',
  JSON.stringify(data, null, 4)
);
