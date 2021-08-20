var Scriptdb = require('script.db');

var a = require("../../api");
var api = new a()

module.exports = {
    name: "playtime",
	description: "Xem thời gian chơi",
    aliases: ['pt'],
	delay: 10,
	vote: true,
    
    async execute(client, message, args) {
        if (!args[0]) return message.channel.send(client.inputUsername).then(msg => msg.delete({timeout: 60000}));

		let pt = new Scriptdb(`${client.disk}/data/playtime/${args[0]}.json`);
		let playtime = pt.get('time')
		
		if (playtime === undefined) return message.channel.send(client.userNotFound).then(msg => msg.delete({timeout: 60000}));
    
		message.channel.send({ embed: {
			color: 0x2EA711,
			description: args[0] + ": " + api.playtimeCalc(playtime)
		}}).then(msg => msg.delete({timeout: 60000}));
    }
}