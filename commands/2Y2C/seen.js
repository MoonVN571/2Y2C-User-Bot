var Scriptdb = require('script.db');

var a = require("../../api");
var api = new a()

module.exports = {
    name: "seen",
    description: "Xem lần cuối bot nhìn thấy người chơi",
    aliases: ['see'],
    
    async execute(client, message, args) {
        if (!args[0]) return message.lineReplyNoMention(client.inputUsername).then(msg => msg.delete({timeout: 60000}));

        let ls = new Scriptdb(client.disk + `/data/seen/${args[0]}.json`);
		let lastseen = ls.get('seen');

        if (lastseen === undefined) return message.lineReplyNoMention(client.userNotFound).then(msg => msg.delete({timeout: 60000}));
        
        var age = api.ageCalc(lastseen);
        
		message.lineReplyNoMention({ embed: {
			color: 0x2EA711,
			description: `${args[0]} hoạt động từ ${age} trước.`
		}}).then(msg => msg.delete({timeout: 60000}));
    }
}