var { MessageEmbed } = require('discord.js');
var Scriptdb = require('script.db');

var a = require("../../api");
var api = new a();


module.exports = {
    name: "firstdeath",
    description: "Xem tin nhắn chết lần đầu",
    aliases: ['fd'],
    delay: 10,

    async execute(client, message, args) {
		if (!args[0]) return message.lineReplyNoMention(client.inputUsername).then(msg => msg.delete({timeout: 60000}));

		let quote = new Scriptdb(`${client.disk}/data/kills/${args[0]}.json`)
		let msgs = quote.get('deaths')
		let times = quote.get('times')
		
		if (msgs === undefined || times == undefined) return message.lineReplyNoMention(client.userNotFound).then(msg => msg.delete({timeout: 60000}));

		let data;
		let time;

        try {
            data = msgs.split(" | ")[msgs.split(" | ").length - 1];
        } catch(e) {
            data = msgs;
        }

        try {
            time = times.split(" | ")[times.split(" | ").length - 1]
        } catch(e) {
            time = times;
        }

        var embed = new MessageEmbed()
                            .setDescription("**" +api.ageCalc(time) + " trước**: " + data)
                            .setColor(0x2EA711)

        message.lineReplyNoMention(embed).then(msg => msg.delete({timeout: 60000}));
    }
}