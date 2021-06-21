var Scriptdb = require('script.db');
var { RichEmbed } = require('discord.js');

var abc = require("../api")
var api = new abc();

module.exports = {
    name: "kills",
    aliases: [''],
    
    async execute(client, message, args) {
        if (!args[0]) return message.channel.send(client.userNotFound).then(msg => msg.delete(60000));

		let quotes = new Scriptdb(`${client.config.disk}/data/kills/${args[0]}.json`)
		let deaths = quotes.get('deaths')
		let times = quotes.get('times')

		if(times == undefined || deaths == undefined) return message.channel.send(client.userNotFound).then(msg => msg.delete(60000));

		let msg0;
		let msg1;
		let msg2;
		let msg3;
		let msg4;

		let time0;
		let time1;
		let time2;
		let time3;
		let time4;
		
		if(times.toString().toString().includes(" | ")) {
			if(times.toString().split(" | ").length <= 5) {
				time0 = times.toString().split(" | ")[0]
				time1 = times.toString().split(" | ")[1]
				time2 = times.toString().split(" | ")[2]
				time3 = times.toString().split(" | ")[3]
				time4 = times.toString().split(" | ")[4]
				
				msg0 = deaths.toString().split(" | ")[0]
				msg1 = deaths.toString().split(" | ")[1]
				msg2 = deaths.toString().split(" | ")[2]
				msg3 = deaths.toString().split(" | ")[3]
				msg4 = deaths.toString().split(" | ")[4]
			} else {
				time0 = times.toString().split(" | ")[times.toString().split(" | ").length - 1]
				time1 = times.toString().split(" | ")[times.toString().split(" | ").length - 2]
				time2 = times.toString().split(" | ")[times.toString().split(" | ").length - 3]
				time3 = times.toString().split(" | ")[times.toString().split(" | ").length - 4]
				time4 = times.toString().split(" | ")[times.toString().split(" | ").length - 5]

				msg0 = deaths.toString().split(" | ")[deaths.toString().split(" | ").length - 1]
				msg1 = deaths.toString().split(" | ")[deaths.toString().split(" | ").length - 2]
				msg2 = deaths.toString().split(" | ")[deaths.toString().split(" | ").length - 3]
				msg3 = deaths.toString().split(" | ")[deaths.toString().split(" | ").length - 4]
				msg4 = deaths.toString().split(" | ")[deaths.toString().split(" | ").length - 5]
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
									.setTitle(`Báo cáo của ${args[0]}`)
									.setDescription(`*Tổng số ghi nhận người này: ${deaths.toString().split(" | ").length}*\n`)
									.addField('*5 lần chết gần đây*', data + "\n")
									.setFooter(client.footer)
									.setTimestamp()
									.setColor(0x2EA711);

			message.channel.send(embed).then(msg => msg.delete(60000));
		} else {
			var embed = new RichEmbed()
									.setTitle(`Báo cáo của ${args[0]}`)
									.setDescription(`*Tổng số ghi nhận người này: 1\n`)
									.addField('*5 lần chết gần đây*', deaths + "\n")
									.setFooter(client.footer)
									.setTimestamp()
									.setColor(0x2EA711);

			message.channel.send(embed).then(msg => msg.delete(60000));
		}
    }
}