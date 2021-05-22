var Scriptdb = require('script.db');

var newAPI = require('../api');
var api = new newAPI()

module.exports = {
    name: "messages",
    aliases: ['msgs'],
    
    async execute(client, message, args) {
		if (!args[0]) return message.channel.send(client.userNotFound).catch(e => { message.author.send("**Lỗi:** " + e.toString() + ". Hãy báo cáo cho " + client.authorID); });;

		let quotes = new Scriptdb(`${client.config.disk}/data/quotes/${args[0]}.json`)
		let messages = quotes.get('messages')
		let times = quotes.get('times')

		if(times == undefined || messages == undefined) return message.channel.send(client.userNotFound).catch(e => { message.author.send("**Lỗi:** " + e.toString() + ". Hãy báo cáo cho " + client.authorID); });

		var msg0 = messages.split(" | ")[1]
		var msg1 = messages.split(" | ")[2]
		var msg2 = messages.split(" | ")[3]	
		var msg3 = messages.split(" | ")[4]
		var msg4 = messages.split(" | ")[5]

		var time0 = times.split(" | ")[1]
		var time1 = times.split(" | ")[2]
		var time2 = times.split(" | ")[3]
		var time3 = times.split(" | ")[4]
		var time4 = times.split(" | ")[5]
		
		var data = `***${api.ageCalc(time0)}trước***: ${msg0}\n***${api.ageCalc(time0)}trước***: ${msg1}\n***${api.ageCalc(time2)}trước***: ${msg2}\n***${api.ageCalc(time3)}trước***: ${msg3}\n***${api.ageCalc(time4)}trước***: ${msg4}\n`;
		if(time0 == undefined || msg0 == undefined) {
			data = `***${api.ageCalc(time0)}trước***: ${msg0}\n***${api.ageCalc(time0)}trước***: ${msg1}\n***${api.ageCalc(time2)}trước***: ${msg2}\n***${api.ageCalc(time3)}trước***: ${msg3}\n***${api.ageCalc(time4)}trước***: ${msg4}\n`
		}
		if(time1 == undefined || msg1 == undefined) {
			data = `***${api.ageCalc(time0)}trước***: ${msg1}\n***${api.ageCalc(time2)}trước***: ${msg2}\n***${api.ageCalc(time3)}trước***: ${msg3}\n***${api.ageCalc(time4)}trước***: ${msg4}\n`
		}
		if(time2 == undefined || msg2 == undefined) {
			data = `***${api.ageCalc(time2)}trước***: ${msg2}\n***${api.ageCalc(time3)}trước***: ${msg3}\n***${api.ageCalc(time4)}trước***: ${msg4}\n`
		}
		if(time3 == undefined || msg3 == undefined) {
			data = `***${api.ageCalc(time3)}trước***: ${msg3} \n***${api.ageCalc(time4)}trước***: ${msg4}\n`
		}
		if(time4 == undefined || msg4 == undefined) {
			data = `***${api.ageCalc(time4)} trước***: ${msg4}\n`
		}
	
		message.channel.send({ embed: {
			color: 0x2EA711,
			description: `**${args[0]}'s messages**\n*Tổng tin nhắn đã gửi: ${messages.split(" | ").length}*\n\n*5 tin nhắn gần đây*\n${data}`
		}}).catch(e => { 
			message.author.send("**Lỗi:** " + e.toString() + ". Hãy báo cáo cho " + client.authorID + ".") 
		});
	}
}