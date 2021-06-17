var Scriptdb = require('script.db');

var ap = require('../api');
var api = new ap();

module.exports = {
    name: "joindate",
    aliases: ['jd'],
    
    async execute(client, message, args) {
        return message.channel.send({ embed: {
			color: 0x2EA711,
			description: `Lệnh đã bị tắt!`
		}}).then(msg => msg.delete(60000));

        if (!args[0]) return message.channel.send(client.userNotFound).then(msg => msg.delete(60000));

		let fj = new Scriptdb(`${client.config.disk}/data/joindate/${args[0]}.json`)
		let firstjoin = fj.get('date')

        if (firstjoin === undefined) return message.channel.send(client.userNotFound).then(msg => msg.delete(60000));
    
        var t = firstjoin.split(" ")[1];

        var date = firstjoin.replace('/', '-').replace(".", "-").replace('.2', '-202').replace("/2", '-202')

        var day = date.split("-")[0]
        var month = date.split("-")[1]
        var year = date.split("-")[2].split(" ")[0];


        var datee = year + '-' + month + '-' + day + "T" + t.replace(" ", "T") + ":55.506Z";

        var tick = new Date(datee).getTime();

		message.channel.send({ embed: {
			color: 0x2EA711,
			description: `${args[0]}: ${firstjoin} (${api.ageCalc(tick)} trước)`
		}}).then(msg => msg.delete(60000));
    }
}