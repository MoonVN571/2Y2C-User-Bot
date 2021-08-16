var { MessageEmbed } = require('discord.js');
var Scriptdb = require('script.db');

var a = require("../../api");
var api = new a();

module.exports = {
    name: "lastdeath",
    description: "Xem lần chết gần nhất",
    aliases: ['ld'],
    delay: 10,
    
    execute(client, message, args) {
		if (!args[0]) return message.lineReplyNoMention(client.inputUsername).then(msg => msg.delete({timeout: 60000}));

		let quote = new Scriptdb(`${client.disk}/data/deaths/${args[0]}.json`)
		let msgs = quote.get('deaths')
		let times = quote.get('times')
		
		if (msgs === undefined || times == undefined) return message.lineReplyNoMention(client.userNotFound).then(msg => msg.delete({timeout: 60000}));

		let data = msgs.split(" | ")[0];
		let time;

        try {
            time = times.split(" | ")[0];
        } catch(e) {
            time = times;
        }

        var embed = new MessageEmbed()
                            .setDescription("**" + api.ageCalc(time) + " trước**: " + data)
                            .setColor(0x2EA711)

        message.lineReplyNoMention(embed).then(msg => msg.delete({timeout: 60000}));
    }
}