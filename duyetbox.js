module.exports.config = {
  name: "duyet",
  version: "1.0.2",
  hasPermssion: 2,
  credits: "DungUwU",
  description: "duyệt box dùng bot xD",
  commandCategory: "Người hỗ trợ bot",
  cooldowns: 5
};


const dataPath = __dirname + "/cache/approvedThreads.json";
const pendingPath = __dirname + "/cache/pendingThreads.json";
const fs = require("fs");

module.exports.onLoad = () => {
  if (!fs.existsSync(dataPath)) fs.writeFileSync(dataPath, JSON.stringify([]));
  if (!fs.existsSync(pendingPath)) fs.writeFileSync(pendingPath, JSON.stringify([]));
}

module.exports.run = async ({ event, api, args }) => {
  const { threadID, messageID, senderID } = event;
  let data = JSON.parse(fs.readFileSync(dataPath));
  let pending = JSON.parse(fs.readFileSync(pendingPath));
  let msg = "";
  let idBox = (args[0]) ? args[0] : threadID;
  if (args[0] == "list") {
    msg = "DANH SÁCH CÁC BOX ĐÃ DUYỆT!";
    let count = 0;
    for (e of data) {
      msg += `\n${count += 1}. •𝐈𝐃: ${e}`;
    }
    api.sendMessage(msg, threadID, messageID);
  }
  else if (args[0] == "del") {
    idBox = (args[1]) ? args[1] : event.threadID;
    if (isNaN(parseInt(idBox))) return api.sendMessage("Không phải một con số", threadID, messageID);
    if (!data.includes(idBox)) return api.sendMessage("Box không được duyệt từ trước!", threadID, messageID);
    api.sendMessage(`Box ${idBox} đã bị gỡ khỏi danh sách được phép dùng bot`, threadID, () => {
      if (!pending.includes(idBox)) pending.push(idBox);
      data.splice(data.indexOf(idBox), 1);
      fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
      fs.writeFileSync(pendingPath, JSON.stringify(pending, null, 2));
    }, messageID)
  }
  else if (args[0] == "pending") {
    msg = "DANH SÁCH CÁC BOX CHỜ ĐƯỢC DUYỆT!";
    let count = 0;
    for (e of pending) {
      let name = (await api.getThreadInfo(e)).name || "Nhóm Chat";
      msg += `\n${count += 1}. ${name}\nID: ${e}`;
    }
    api.sendMessage(msg, threadID, messageID);
  }
  else if (isNaN(parseInt(idBox))) api.sendMessage("Mã Số Này Có Cặc", threadID, messageID);
  else if (data.includes(idBox)) api.sendMessage(`Mã Số ${idBox} Được Chấp Nhận Rồi`, threadID, messageID);
  else api.sendMessage("» 𝗖𝗵𝗮̂́𝗽 𝗡𝗵𝗮̣̂𝗻 𝗬𝗲̂𝘂 𝗖𝗮̂̀𝘂 𝗖𝘂̉𝗮 𝗕𝗮̆𝗻𝗴 𝗛𝗮̉𝗶 𝗧𝗮̣̆𝗰  𝗧𝗵𝗮̀𝗻𝗵 𝗖𝗼̂𝗻𝗴.\n»𝗕𝗮̆𝗻𝗴 𝗛𝗮̉𝗶 𝗧𝗮̣̆𝗰 𝗖𝘂̉𝗮 𝗕𝗮̣𝗻.. 𝗔𝗱𝗺𝗶𝗻 𝗖𝗵𝗼 𝗣𝗵𝗲́𝗽 𝗕𝗮̣𝗻 𝗦𝘂̛̉ 𝗗𝘂̣𝗻𝗴 𝗕𝗼𝘁 𝗥𝗼̂̀𝗶 🎉", idBox, (error, info) => {
    if (error) return api.sendMessage("Đã có lỗi xảy ra, đảm bảo rằng id bạn nhập hợp lệ và bot đang ở trong box!", threadID, messageID);
    else {
      data.push(idBox);
      pending.splice(pending.indexOf(idBox), 1);
      fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
      fs.writeFileSync(pendingPath, JSON.stringify(pending, null, 2));
      api.sendMessage(`🎊🎊𝗦𝘂𝗰𝗰𝗲𝘀𝘀 𝗗𝘂𝘆𝗲̣̂𝘁 𝗧𝗵𝗮̀𝗻𝗵 𝗖𝗼̂𝗻𝗴🎊🎊:\n${idBox}`, threadID, messageID);
    }
  });
  }