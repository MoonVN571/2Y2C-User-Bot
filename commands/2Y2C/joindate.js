var Scriptdb = require('script.db');

var a = require("../../api");
var api = new a();

module.exports = {
    name: "joindate",
    description: "Xem lần đầu nhìn thấy người chơi",
    aliases: ['jd'],
    delay: 10,
    
    execute(client, message, args) {
        if (!args[0]) return message.lineReplyNoMention(client.inputUsername).then(msg => msg.delete({timeout: 60000}));

		let fj = new Scriptdb(`${client.disk}/data/joindate/${args[0]}.json`)
		let firstjoin = fj.get('date')

        if (firstjoin === undefined) return message.lineReplyNoMention(client.userNotFound).then(msg => msg.delete({timeout: 60000}));
    
        var t = firstjoin.split(" ")[1];

        var date = firstjoin.replace('/', '-').replace(".", "-").replace('.2', '-202').replace("/2", '-202')

        var day = date.split("-")[0]
        var month = date.split("-")[1]
        var year = date.split("-")[2].split(" ")[0];


        var datee = year + '-' + month + '-' + day + "T" + t.replace(" ", "T") + ":55.506Z";

        var tick = new Date(datee).getTime();

		message.lineReplyNoMention({embed: {
			color: 0x2EA711,
			description: `${args[0]}: ${firstjoin} (${api.ageCalc(tick)} trước)`,
            footer: {text: "Bot chỉ lưu data này sau 28/1/2021"}
		}}).then(msg => msg.delete({timeout: 60000}));
    }
}