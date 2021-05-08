var Scriptdb = require('script.db');

var newAPI = require('./api');
var api = new newAPI()

module.exports = {
    name: "seen",
    aliases: ['see'],
    
    async execute(client, message, args) {
        let ls = new Scriptdb(client.config.disk + `/data/seen/${args[0]}.json`);
		let lastseen = ls.get('seen');

		if (!args[0]) return message.channel.send(client.userNotFound)

        if (lastseen === undefined) return message.channel.send(client.userNotFound).catch(e => { message.author.send("**Lỗi:** " + e.toString() + ". Hãy báo cáo cho " + client.authorID); });
        
        var age = api.ageCalc(lastseen);

        message.channel.send(`${args[0]} hoạt động từ ${age} trước.`).catch(e => { message.author.send("**Lỗi:** " + e.toString() + ". Hãy báo cáo cho " + client.authorID); });
    }
}