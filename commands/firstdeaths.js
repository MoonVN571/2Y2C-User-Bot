var { RichEmbed } = require('discord.js');
var Scriptdb = require('script.db');

var a = require("../api")
var api = new a();

module.exports = {
    name: "firstdeaths",
    aliases: ['fd'],
    
    async execute(client, message, args) {
		if (!args[0]) return message.channel.send(client.userNotFound).then(msg => msg.delete(60000));

		let quote = new Scriptdb(`${client.config.disk}/data/kills/${args[0]}.json`)
		let msgs = quote.get('deaths')
		let times = quote.get('times')
		
		if (msgs === undefined || times == undefined) return message.channel.send(client.userNotFound).then(msg => msg.delete(60000));

		var data;
		var time;

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

        var embed = new RichEmbed()
                            .setDescription("**" +api.ageCalc(time) + " trước**: " + data)
                            .setColor(0x2EA711)

        message.channel.send(embed).then(msg => msg.delete(60000));
    }
}