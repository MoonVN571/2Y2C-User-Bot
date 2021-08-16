var { MessageEmbed } = require('discord.js');
var Scriptdb = require('script.db');

var a = require("../../api");
var api = new a();

module.exports = {
    name: "lastword",
    description: "Xem tin nhắn mới nhất",
    aliases: ['lw'],
    
    async execute(client, message, args) {
		if (!args[0]) return message.lineReplyNoMention(client.inputUsername).then(msg => msg.delete({timeout: 60000}));

		let quote = new Scriptdb(`${client.disk}/data/quotes/${args[0]}.json`)
		let msgs = quote.get('messages')
		let times = quote.get('times')
		
		if (msgs === undefined || times == undefined) return message.lineReplyNoMention(client.userNotFound).then(msg => msg.delete(60000));

		let data;
		let time;
        
        try {
            data = msgs.split(" | ")[0];
        } catch(e) {
            data = mgs;
        }

        try {
            time = times.split(" | ")[times.split(" | ").length - 1];
        } catch(e) {
            time = times;
        }

        var embed = new MessageEmbed()
                            .setDescription("**" + args[0] + "** [" + api.ageCalc(time) + " trước]: " + data)
                            .setColor(0x2EA711)

        message.lineReplyNoMention(embed).then(msg => msg.delete({timeout: 60000}));
    }
}