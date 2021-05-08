var Scriptdb = require('script.db');

var newAPI = require('./api');
var api = new newAPI()

module.exports = {
    name: "lastwords",
    aliases: [''],
    
    async execute(client, message, args) {
		if (!args[0]) return message.channel.send(client.userNotFound);

		let quote = new Scriptdb(`${client.config.disk}/data/quotes/${args[0]}.json`)
		let msgs = quote.get('messages')
		let times = quote.get('times')

		if (msgs === undefined || times == undefined) return message.channel.send(client.userNotFound);

		var data = msgs.split(" | ")[msgs.split(" | ").length - 1];
		var time = times.split(" | ")[times.split(" | ").length - 1];

        message.channel.send(`**${api.ageCalc(time)} trước**: <${args[0]}> ${data}`).catch(e => { message.author.send("**Lỗi:** " + e.toString() + ". Hãy báo cáo cho " + client.authorID); });
    }
}