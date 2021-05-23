var Discord = require('discord.js');

module.exports = {
    name: "help",
    aliases: [''],
    
    async execute(client, message, args) {
		var embed = new Discord.RichEmbed()
						.setTitle("Moon 2Y2C")
						.setDescription(
							"\nMoon Bot Discord: https://discord.gg/yrNvvkqp6w\n\n" +
							"**Comamnds:**" +
							"\n!help - Xem command bot\n" +
							"!stats hoặc !kd - Xem kd người chơi. ( kills: 15/01, deaths: 13/01 )\n" + 
							"!joindate hoặc !jd - Xem người chơi lần đầu tham gia server. ( 28/01 )\n" + 
							"!seen - Xem lần cuối nhìn thấy người chơi. ( 02/02 )\n" +
							"!playtime hoặc !pt - Xem thời gian đã chơi của người chơi. ( 24/03 )\n" +
							"!lastwords - Xem tin nhắn mới nhất của người chơi. ( 14/03 )\n" +
							"!firstwords - Xem tin nhắn đầu tiên.\n" +
							"!messages - Xem 5 tin nhắn mới nhất.\n" + 
							"!queue, !que hoặc !q - Xem hàng chờ và ưu tiên.\n" +
							"!normalqueue hoặc !nq - Xem hàng chờ.\n" +
							"!prio hoặc !prioqueue - Xem thông số bao gồm hàng chờ. ưu tiên, trực tuyến.\n" +
							"!online - Xem người chơi đang hoạt động.\n"+ 
							"!status - Xem hàng chờ, ưu tiên, online.\n" +
							"!avatar - Xem avatar.\n"
							+ "!sudo - Cho bot chat nội dung yêu cầu. ( chỉ dev )"
						)
						.setColor('0x2EA711')
						.setTimestamp()
						.setFooter("Moon 2Y2C");

		message.channel.send(embed).catch(e => { 
			message.author.send("**Lỗi:** " + e.toString() + ". Hãy báo cáo cho " + client.authorID + ".") 
		});
    }
}