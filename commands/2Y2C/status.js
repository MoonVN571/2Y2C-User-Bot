var a = require("../../api");
var api = new a();

var { MessageEmbed } = require('discord.js');
var Scriptdb = require("script.db");

module.exports = {
    name: "status",
    description: "Xem thông số server.",
    aliases: ['uptime', 'tps', 'q', 'queue', 'que', 'prio', 'prioqueue', 'normalqueue'],

    execute(client, message, args) {
        var data = new Scriptdb(client.disk + "/data.json");

        var queue = data.get('queue');
        var prio = data.get('prio');

        var tab = data.get('tab-content');
        if(tab == null) return message.channel.send("Bot chưa vào server.").then(msg => msg.delete({timeout: 60000}));

		var uptime = tab.split(' - ')[3].split("restart từ")[1].split("trước")[0];
		var tps = tab.split('  ')[1].split(' tps')[0];
		var players = tab.split('  ')[1].split(' ')[3];
		var ping = tab.split(" - ")[2].split(" ping")[0];
		var timepassed  = tab.split(" | ")[1];

        if(queue == undefined || prio == undefined) return message.channel.send("Không tìm thấy dữ liệu.");
        
		var embed = new MessageEmbed()
                .setAuthor('2Y2C','https://cdn.discordapp.com/attachments/795842485133246514/821669964673974282/communityIcon_14otnpwidot51.png', 'https://minecraft-mp.com/server-s271071')
                .addField('Server Uptime',uptime, true)
				.addField('TPS', tps, true)
				.addField('Players', players + " players", true)
				.addField('Ping', ping + "ms", true)
				.addField('Queue', queue, true)
                .addField("Priority", prio, true)
                .setFooter('Cập nhật ``' + api.ageCalc(timepassed) + "`` trước.", 'https://cdn.discordapp.com/avatars/768448728125407242/f18ec971961b23db96e6cf0f3f79ec1c.png?size=256')
                .setColor(0x000DFF)
                .setTimestamp();

		message.channel.send(embed).then(msg => msg.delete(120000));
    }
}