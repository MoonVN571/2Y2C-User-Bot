var Scriptdb = require('script.db');

var newAPI = require('../api');
var api = new newAPI()

module.exports = {
    name: "firstwords",
    aliases: [''],
    
    async execute(client, message, args) {
		if (!args[0]) return message.channel.send(client.userNotFound)

		let quote = new Scriptdb(`${config.disk}/data/quotes/${args[0]}.json`)
		let msgs = quote.get('messages')
		let times = quote.get('times')
		
		if (msgs === undefined || times == undefined) return message.channel.send(client.userNotFound);

		var data = msgs.split(" | ")[0];
		var time = times.split(" | ")[0];

		setTimeout(() => { 
			message.channel.send(`**${api.ageCalc(time)} trước**: <${args[0]}> ${data}`).catch(e => { message.author.send("**Lỗi:** " + e.toString() + ". Hãy báo cáo cho " + client.authorID); });
	 	}, 1 * 1000);
    }
}