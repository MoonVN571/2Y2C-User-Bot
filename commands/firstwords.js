var { RichEmbed } = require('discord.js');
var Scriptdb = require('script.db');

var a = require("../api")
var api = new a();

module.exports = {
    name: "firstwords",
    aliases: ['fw'],
    
    async execute(client, message, args) {
		if (!args[0]) return message.channel.send(client.userNotFound)

		let quote = new Scriptdb(`${client.config.disk}/data/quotes/${args[0]}.json`)
		let msgs = quote.get('messages')
		let times = quote.get('times')
		
		if (msgs === undefined || times == undefined) return message.channel.send(client.userNotFound);

		var data;
		var time;
        
        try {
            data = msgs.split(" | ")[msgs.split(" | ").length - 1];
        } catch(e) {
            data = mgs;
        }

        try {
            time = times.split(" | ")[0];
        } catch(e) {
            time = times;
        }
        
        var embed = new RichEmbed()
                            .setDescription("**" + args[0] + "** [" + api.ageCalc(time) + " trước]: " + data)
                            .setColor(0x2EA711)

        message.channel.send(embed).then(msg => msg.delete(60000));
    }
}