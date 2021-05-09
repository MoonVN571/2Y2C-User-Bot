var Scriptdb = require('script.db');

var newAPI = require('../api');
var api = new newAPI()

module.exports = {
    name: "status",
    aliases: ['queue', 'q', 'prioqueue', 'prio', 'ping', 'tps', 'que', 'uptime'],
    
    async execute(client, message, args) {
        var data = new Scriptdb(`${client.config.disk}/data.json`);

		var tab = data.get('tab-content');
		if(dataa == undefined) return message.channel.send("Bot chưa kết nối vào server hoặc server không hoạt động.");
		var uptime = tab.split(' - ')[3].split(" | ")[0].split("restart từ")[1].split("trước")[0];
		var tps = tab.split(' ')[1];
		var players = tab.split(' ')[4];
		var ping = tab.split(" - ")[2].split(" ping")[0];
		var timepassed  = tab.split(" | ")[1];

		var queue = data.get('queue');
		var prio = data.get('prio');

		if(queue == undefined) {
			queue = null;
		}

		if(prio == undefined) {
			prio = null;
		}

        message.channel.send(
            `**Server Uptime**: ${uptime}\n` +
            `**Bot Uptime**: ${api.uptimeCalc()}\n` +
            `**TPS**: ${tps}\n` +
            `**Online**: ${players} players\n` + 
            `**Ping**: ${ping}ms\n` + 
            `**Hàng chờ**: ${queue} - Ưu tiên: ${prio}\n\n` +
            `*${api.ageCalc(timepassed)} trước*.`).catch(e => { message.author.send("**Lỗi:** " + e.toString() + ". Hãy báo cáo cho " + client.authorID); });
    }
}