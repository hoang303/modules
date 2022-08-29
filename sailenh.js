module.exports.config = {
  name: "\n",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "mod by Văn Huy",
  description: "Random ảnh gái khi dùng dấu lệnh",
  commandCategory: "Hình ảnh",
  usages: "noprefix",
  cooldowns: 5,
  dependencies: {
    "request":"",
    "fs-extra":"",
    "axios":""
  }
};

module.exports.run = async({api,event,args,client,Users,Threads,GLOBAL,Currencies}) => {
const axios = require('axios');
const request = global.nodemodule["request"];
const fs = global.nodemodule["fs-extra"];
const moment = require("moment-timezone");
    var gio = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss || D/MM/YYYY");
  var link = [
"https://i.postimg.cc/sgQZXFv5/Daddy-To-Be-ft-Kim-Yohan.gif",
"https://i.postimg.cc/7PRzyYLq/multi-couple.gif",
];
	var callback = () => api.sendMessage({body:`🌸SadBoy🌸\n🎀──── •❤️• ────🎀\n[ ${gio} ]`,attachment: fs.createReadStream(__dirname + "/cache/sailenh/5.gif")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/sailenh/5.gif"));	
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/sailenh/5.gif")).on("close",() => callback());
   };