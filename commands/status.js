var newAPI = require('../api.js');
var api = new newAPI();

var Discord = require('discord.js');
var Scriptdb = require("script.db");

module.exports = {
    name: "status",
    description: "status command.",
    aliases: ['uptime', 'tps', 'q', 'queue', 'que', 'prio', 'prioqueue', 'normalqueue'],

    async execute(client, message, args) {
        var data = new Scriptdb(client.config.disk + "/data.json");

        var queue = data.get('queue');
        var prio = data.get('prio');

        var tab = data.get('tab-content');
        if(tab == undefined) return message.channel.send("Bot chưa kết nối đến server hoặc server không hoạt động.");

		var uptime = tab.split(' - ')[3].split(" | ")[0].split("restart từ")[1].split("trước")[0];
		var tps = tab.split(' ')[1];
		var players = tab.split(' ')[4];
		var ping = tab.split(" - ")[2].split(" ping")[0];
		var timepassed  = tab.split(" | ")[1];

        if(tps == "tps" || ping == "ping"|| players == "players")
                    return message.channel.send(`Lỗi, thử lại sau! Hãy báo cáo lỗi này với **${client.authorID}`)

        if(queue == undefined || prio == undefined) return message.channel.send("Không tìm thấy dữ liệu.");
        
		var embed = new Discord.RichEmbed()
                .setAuthor('2Y2C','https://cdn.discordapp.com/attachments/795842485133246514/821669964673974282/communityIcon_14otnpwidot51.png', 'https://minecraft-mp.com/server-s271071')
				.addField('Server Uptime',uptime, true)
				.addField('Bot Uptime', api.uptimeCalc(), true)
				.addField('TPS', tps, true)
				.addField('Players', players + " players", true)
				.addField('Ping', ping + "ms", true)
				.addField('Hàng chờ', "Bình thường: " + queue.split(" | ")[0] + " - Ưu tiên: " + prio.split(" | ")[0], true)
                .setFooter('Trạng thái server được cập nhật từ ' + api.ageCalc(timepassed) + " trước.", 'https://cdn.discordapp.com/avatars/768448728125407242/f18ec971961b23db96e6cf0f3f79ec1c.png?size=256')
                .setColor(0x000DFF)
                .setTimestamp();

		message.channel.send(embed);
    }
}