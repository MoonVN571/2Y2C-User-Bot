var { RichEmbed } = require('discord.js');
var Scriptdb = require('script.db');

var a = require("../api")
var api = new a();

module.exports = {
    name: "lastkills",
    aliases: ['lk'],
    
    async execute(client, message, args) {
		if (!args[0]) return message.channel.send(client.userNotFound).then(msg => msg.delete(60000));

		let quote = new Scriptdb(`${client.config.disk}/data/kills/${args[0]}.json`)
		let msgs = quote.get('deaths')
		let times = quote.get('times')
		
		if (msgs === undefined || times == undefined) return message.channel.send(client.userNotFound).then(msg => msg.delete(60000));

		let data = msgs.split(" | ")[0];
		let time

        try {
            time = times.split(" | ")[0];
        } catch(e) {
            time = times;
        }

        var embed = new RichEmbed()
                            .setDescription("**" + api.ageCalc(time) + " trước**: " + data)
                            .setColor(0x2EA711)

        message.channel.send(embed).then(msg => msg.delete(60000));
    }
}