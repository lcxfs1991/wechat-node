// https://github.com/creeperyang/pinyin

const { readFileSync, writeFileSync } = require('fs-extra');
const pinyin = require('tiny-pinyin');

let data = require('../data/initcontact.json');

// console.log(data);

data = data.map((item) => {
  item.pinyin = pinyin.convertToPinyin(item.alias);
  return item;
});

data = data.sort(function compareFunction(item1, item2) {
  return item1.pinyin.localeCompare(item2.pinyin);
});

writeFileSync('./data/initcontact-sorted.json', JSON.stringify(data, null, 4));
