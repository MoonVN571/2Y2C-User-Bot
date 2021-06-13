var Scriptdb = require('script.db');
var { RichEmbed } = require('discord.js');

var abc = require("../api")
var api = new abc();

module.exports = {
    name: "messages",
    aliases: ['msgs'],
    
    async execute(client, message, args) {
        if (!args[0]) return message.channel.send(client.userNotFound)

		let quotes = new Scriptdb(`${client.config.disk}/data/quotes/${args[0]}.json`)
		let messages = quotes.get('messages')
		let times = quotes.get('times')

		if(times == undefined || messages == undefined) return message.channel.send(client.userNotFound)

		var msg0 = undefined;
		var msg1 = undefined;
		var msg2 = undefined;
		var msg3 = undefined;
		var msg4 = undefined;

		var time0 = undefined;
		var time1 = undefined;
		var time2 = undefined;
		var time3 = undefined;
		var time4 = undefined;
		 
		if(times.toString().includes(" | ")) {
			if(times.split(" | ").length <= 5) {
				time0 = times.split(" | ")[0]
				time1 = times.split(" | ")[1]
				time2 = times.split(" | ")[2]
				time3 = times.split(" | ")[3]
				time4 = times.split(" | ")[4]
				
				msg0 = messages.split(" | ")[0]
				msg1 = messages.split(" | ")[1]
				msg2 = messages.split(" | ")[2]
				msg3 = messages.split(" | ")[3]
				msg4 = messages.split(" | ")[4]
			} else {
				time0 = times.split(" | ")[times.split(" | ").length - 1]
				time1 = times.split(" | ")[times.split(" | ").length - 2]
				time2 = times.split(" | ")[times.split(" | ").length - 3]
				time3 = times.split(" | ")[times.split(" | ").length - 4]
				time4 = times.split(" | ")[times.split(" | ").length - 5]

				msg0 = messages.split(" | ")[messages.split(" | ").length - 1]
				msg1 = messages.split(" | ")[messages.split(" | ").length - 2]
				msg2 = messages.split(" | ")[messages.split(" | ").length - 3]
				msg3 = messages.split(" | ")[messages.split(" | ").length - 4]
				msg4 = messages.split(" | ")[messages.split(" | ").length - 5]
			}
			
			var data = `***${api.ageCalc(time0)} trước***: ${msg0}\n`
			+ `***${api.ageCalc(time1)} trước***: ${msg1}\n`
			+ `***${api.ageCalc(time2)} trước***: ${msg2}\n`
			+ `***${api.ageCalc(time3)} trước***: ${msg3}\n`
			+ `***${api.ageCalc(time4)} trước***: ${msg4}`
			
			if(time4 === undefined) {
				data = `***${api.ageCalc(time0)} trước***: ${msg0}\n`
				+ `***${api.ageCalc(time1)} trước***: ${msg1}\n`
				+ `***${api.ageCalc(time2)} trước***: ${msg2}\n`
				+ `***${api.ageCalc(time3)} trước***: ${msg3}`
			}

			if(time3 === undefined) {
				data = `***${api.ageCalc(time0)} trước***: ${msg0}\n`
				+ `***${api.ageCalc(time1)} trước***: ${msg1}\n`
				+ `***${api.ageCalc(time2)} trước***: ${msg2}`
			}

			if(time2 === undefined) {
				data = `***${api.ageCalc(time0)} trước***: ${msg0}\n`
				+ `***${api.ageCalc(time1)} trước***: ${msg1}`
			}

			if(time1 === undefined) {
				data = `***${api.ageCalc(time0)} trước***: ${msg0}`
			}

			var embed = new RichEmbed()
									.setTitle(`Tin nhắn ${args[0]}`)
									.setDescription(`*Tổng tin nhắn đã gửi: ${messages.split(" | ").length}*\n`)
									.addField('*5 tin nhắn gần đây*', data)
									.setFooter(client.footer)
									.setTimestamp()
									.setColor(0x2EA711);

			message.channel.send(embed).then(msg => msg.delete(60000));
		} else {
			var embed = new RichEmbed()
									.setTitle(`Tin nhắn ${args[0]}`)
									.setDescription(`*Tổng tin nhắn đã gửi: ${messages.split(" | ").length}*\n`)
									.addField('*5 tin nhắn gần đây*', `***${api.ageCalc(times)} trước:*** ${messages}`)
									.setFooter(client.footer)
									.setTimestamp()
									.setColor(0x2EA711);

			message.channel.send(embed).then(msg => msg.delete(60000));
		}
    }
}