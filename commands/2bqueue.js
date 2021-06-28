const request = require('request');
var Discord = require('discord.js');

module.exports = {
    name: "2bqueue",
    aliases: ['2bq', '2bque'],
    
    async execute(client, message, args) {
		request('https://api.2b2t.dev/prioq', function (error, response, body) {
			let datap = JSON.parse(body)[1];
			if(error) datap = -1;
			
			request('https://2b2t.io/api/queue?last=true', function (error, response, body) {
				let dataq = JSON.parse(body)[0][1];
				if(error) dataq = -1;

				var queue = new Discord.RichEmbed()
									.setDescription("2B2T | Hàng chờ: " + dataq + " - Ưu tiên: " + datap)
									.setColor(0x2EA711);

				message.channel.send(queue).then(msg => msg.delete(60000));
			});
		});
    }
}