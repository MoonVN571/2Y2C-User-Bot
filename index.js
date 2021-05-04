const Discord = require("discord.js");
const client = new Discord.Client();
var Scriptdb = require("Script.db")

require('dotenv').config();

var config = {
	token: process.env.token,
	ip: process.env.ip,
	disk: process.env.disk
}

setTimeout(() => {
	process.exit();
}, 5 * 60 * 1000)

client.login(config.token).catch((e) => { console.log(e)})
client.on("error", (e) => { console.error(e) });
var prefix = "!";

var newAPI = require('./api');
var api = new newAPI()

client.on('ready', () => {
	console.log("Bot online!")
	client.user.setPresence({ game: { name: "!help" }})
})

client.on("message", message => {
	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	if (!message.content.startsWith(prefix) || message.author == client.user) return;

	var userNotFound = "Không tìm thấy người chơi.";

	var user = client.users.find(user => user.id === "425599739837284362");

	var authorID = user.username + "#" + user.discriminator;

	if(command == "lastwords") {
		if (!args[0]) return message.channel.send(userNotFound)

		let quote = new Scriptdb(`${config.disk}/data/quotes/${args[0]}.json`)
		let msgs = quote.get('messages')
		let times = quote.get('times')

		if (msgs === undefined || times == undefined) return message.channel.send(userNotFound);

		var data = msgs.split(" | ")[msgs.split(" | ").length - 1];
		var time = times.split(" | ")[times.split(" | ").length - 1];

		setTimeout(() => { 
			message.channel.send(`**${api.ageCalc(time)} trước**: <${args[0]}> ${data}`).catch(e => { message.author.send("**Lỗi:** " + e.toString() + ". Hãy báo cáo cho " + authorID); });
	 	}, 1 * 1000);
	}

	if(command == "firstwords") {
		if (!args[0]) return message.channel.send(userNotFound)

		let quote = new Scriptdb(`${config.disk}/data/quotes/${args[0]}.json`)
		let msgs = quote.get('messages')
		let times = quote.get('times')
		
		if (msgs === undefined || times == undefined) return message.channel.send(userNotFound);

		var data = msgs.split(" | ")[0];
		var time = times.split(" | ")[0];

		setTimeout(() => { 
			message.channel.send(`**${api.ageCalc(time)} trước**: <${args[0]}> ${data}`).catch(e => { message.author.send("**Lỗi:** " + e.toString() + ". Hãy báo cáo cho " + authorID); });
	 	}, 1 * 1000);
	}

	if (command === "stats" || command === "kd") {
		if (!args[0]) return message.channel.send(userNotFound)

		const kd = new Scriptdb(config.disk + `/data/kd/${args[0]}.json`);
		let deads = kd.get('deaths');
		let kills = kd.get('kills');

		if (kills === undefined) {
			kills = 0;
		}

		if (deads === undefined) {
			deads = 0;
		}

		var ratio = kills / deads;
		var ratioFixed = ratio.toFixed(2);

		if (ratioFixed === "NaN" || ratioFixed === "Infinity") {
			ratioFixed = "0.00";
		}

		setTimeout(() => {
			message.channel.send("**" + args[0] + "**: [K: " + kills + " - D: " + deads + " - K/D: " + ratioFixed + "]").catch(e => { message.author.send("**Lỗi:** " + e.toString() + ". Hãy báo cáo cho " + authorID); });
		}, 1 * 1000);
	}

	if(command == "status" || command == "queue" || command == "que" || command == "prioqueue" || command == "pq" || command == "uptime" || command == "tps") {
        var data = new Scriptdb(config.disk + `/data.json`);

		var tab = data.get('tab-content');
		if(dataa == undefined) return message.channel.send("Bot chưa kết nối vào server hoặc server không hoạt động.");
		var uptime = tab.split(' - ')[3].split(" | ")[0].split("restart từ")[1].split("trước")[0];
		var tps = tab.split(' ')[1];
		var players = tab.split(' ')[4];
		var ping = tab.split(" - ")[2].split(" ping")[0];
		var timepassed  = tab.split(" | ")[1];

		var queue = data.get('queue');
		var prio = data.get('prio');

		if(queue == undefined) {
			queue = null;
		}

		if(prio == undefined) {
			prio = null;
		}

		setTimeout(() => {
			message.channel.send(
				`**Server Uptime**: ${uptime}\n` +
				`**Bot Uptime**: ${api.uptimeCalc()}\n` +
				`**TPS**: ${tps}\n` +
				`**Online**: ${players} players\n` + 
				`**Ping**: ${ping}ms\n` + 
				`**Hàng chờ**: ${queue} - Ưu tiên: ${prio}\n\n` +
				`*${api.ageCalc(timepassed)} trước*.`).catch(e => { message.author.send("**Lỗi:** " + e.toString() + ". Hãy báo cáo cho " + authorID); });
		}, 1 * 1000);
	}

	if (command === "playtime" || command === "pt") {
		if (!args[0]) return message.channel.send(userNotFound)

		let pt = new Scriptdb(config.disk + `/data/playtime/${args[0]}.json`);
		let playtime = pt.get('time')
		
		setTimeout(() => {
			if (playtime === undefined) return message.channel.send(userNotFound);
			message.channel.send(args[0] + ": " + api.playtimeCalc(playtime)).catch(e => { message.author.send("**Lỗi:** " + e.toString() + ". Hãy báo cáo cho " + authorID); });
		}, 1 * 1000);
	}

	if (command === "seen") {
		let ls = new Scriptdb(config.disk + `/data/seen/${args[0]}.json`);
		let lastseen = ls.get('seen')

		if (!args[0]) return message.channel.send(userNotFound)

		var d = new Date();
		var time = d.getTime();

		setTimeout(() => {
			if (lastseen === undefined) return message.channel.send(userNotFound).catch(e => { message.author.send("**Lỗi:** " + e.toString() + ". Hãy báo cáo cho " + authorID); });
			var age = api.ageCalc(lastseen);

			message.channel.send(`${args[0]} hoạt động từ ${age} trước.`).catch(e => { message.author.send("**Lỗi:** " + e.toString() + ". Hãy báo cáo cho " + authorID); });
		}, 1 * 1000);

	}

	if (command === "joindate" || command === "jd") {
		let fj = new Scriptdb(config.disk + `/data/joindate/${args[0]}.json`)
		let firstjoin = fj.get('date')

		if (!args[0]) return message.channel.send(userNotFound)

		setTimeout(() => {
			if (firstjoin === undefined) return message.channel.send(userNotFound).catch(e => { message.author.send("**Lỗi:** " + e.toString() + ". Hãy báo cáo cho " + authorID); });

			message.channel.send(`Bot đã thấy ${args[0]} lần đầu vào ${firstjoin}.`).catch(e => { message.author.send("**Lỗi:** " + e.toString() + ". Hãy báo cáo cho " + authorID); });
		}, 3 * 1000);
	}

	if(command == "messages") {
		if (!args[0]) return message.channel.send(userNotFound);

		let quotes = new Scriptdb(`${config.disk}/data/quotes/${args[0]}.json`)
		let messages = quotes.get('messages')
		let times = quotes.get('times')

		if(times == undefined || messages == undefined) return message.channel.send(userNotFound).catch(e => { message.author.send("**Lỗi:** " + e.toString() + ". Hãy báo cáo cho " + authorID); });

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
		if (messages === undefined || times == undefined) return message.channel.send(userNotFound);

		setTimeout(() => { message.author.send(`**${args[0]}'s messages**\n*Tổng tin nhắn đã gửi: ${messages.split(" | ").length}*\n\n*5 tin nhắn gần đây*\n${data}`) }, 1 * 1000)
	}

	if(command == "help") {
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
							"!status - Xem hàng chờ, ưu tiên, online."
						)
						.setColor('0x2EA711')
						.setTimestamp()
						.setFooter("Moon 2Y2C");

		message.author.send(embed).catch(() => {
			message.reply("bật **direct message** để xem các lệnh.")
		});
	}
});
