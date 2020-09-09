const fs = require('fs-extra');

exports.readJson = (fileName) => {
  return JSON.parse(fs.readFileSync(fileName, 'utf-8'));
};

exports.writeJson = (fileName, content) => {
  return fs.writeFileSync(fileName, JSON.stringify(content, null, 4), 'utf-8');
};

exports.getUserInfoById = function (id) {
  const contacts = JSON.parse(
    fs.readFileSync('./data/initcontact-transformed.json')
  );

  if (!id) {
    return {};
  } else {
    for (let index in contacts) {
      if (contacts[index].id === id) {
        return contacts[index];
      }
    }

    return {};
  }
};
