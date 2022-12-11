global.window = this;

const Jsencrypt = require('jsencrypt');

const jsencrypt = new Jsencrypt();

console.log(jsencrypt.encrypt('sss'));
