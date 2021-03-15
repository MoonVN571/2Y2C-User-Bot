const Discord = require("discord.js");
const client = new Discord.Client();
var Scriptdb = require("Script.db")
const mc = require("minecraft-protocol");

require('dotenv').config();

var config = {
	token: process.env.token,
	ip: process.env.ip,
	disk: process.env.disk
}

client.login(config.token).catch((e) => { console.log(e)})
client.on("error", (e) => { console.error(e) });
var prefix = "!";

client.on('ready', () => {
	console.log("Bot online!")
	client.user.setPresence({ game: { name: "!help để xem lệnh" }})
})
client.on("message", message => {
	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	if (!message.content.startsWith(prefix) || message.author == client.user) return;

	var userNotFound = "Không tìm thấy người chơi.";

	if(command == "lastmessages") {
		if (!args[0]) return message.channel.send(userNotFound)

		let lastmessages = new Scriptdb(config.disk + `/lastmessages/${args[0]}.json`);
		var messages = lastmessages.get('messages');
		var times = lastmessages.get('times');

		if (lastmessages === undefined) return message.channel.send(userNotFound);

		message.channel.send(times + "<" + args[0] + "> " + messages)
	}

	if (command === "stats" || command === "kd") {
		if (!args[0]) return message.channel.send(userNotFound)

		const kd = new Scriptdb(config.disk + `/kd/${args[0]}.json`);
		let deads = kd.get('deaths');
		let kills = kd.get('kills');

		if (kills === undefined) {
			kills = 0;
		}

		if (deads === undefined) {
			deads = 0;
		}

		// alex, steve
		var ratio = kills / deads;
		var ratioFixed = ratio.toFixed(2);

		if (ratioFixed === "NaN" || ratioFixed === "Infinity") {
			ratioFixed = "0.00";
		}

		setTimeout(() => {
			message.channel.send("**" + args[0] + "**: [K: " + kills + " - D: " + deads + " - K/D: " + ratioFixed + "]")
		}, 1 * 1000);
	}

	if (command === "playtime" || command === "pt") {
		if (!args[0]) return message.channel.send(userNotFound)

		let pt = new Scriptdb(config.disk + `/playtime/${args[0]}.json`);
		let playtime = pt.get('time')
		
		setTimeout(() => {
			if (playtime === undefined) return message.channel.send(userNotFound);

			var correct = +playtime / 3;
			var temp = correct / 1000;
			var day = 0, hour = 0, minutes = 0;
			day = parseInt(temp / 86400)
			hour = parseInt(((temp - day * 86400) / 3600))
			minutes = parseInt(((temp - day * 86400 - hour * 3600)) / 60)

			var string;

			if( day == 0 ) {
				if(minutes > 0 && hour > 0 ) {
					string = hour + " giờ " + minutes + " phút";		
				}
				if(minutes == 0 && hour > 0) {
					string = hour + " giờ";
				}
				if(minutes > 0 && hour == 0) {
					string = minutes + " phút";
				}
			} else {
				if(minutes > 0 && hour > 0 ) {
					string = day + " ngày " + hour + " giờ " + minutes + " phút";		
				}
				if(minutes == 0 && hour > 0) {
					string = day + " ngày " + hour + " giờ";
				}
				if(minutes > 0 && hour == 0) {
					string = day + " ngày " + minutes + " phút";
				}

			}
			message.channel.send(args[0] + ": " + string);
		}, 1 * 1000);
	}

	if (command === "seen") {
		let ls = new Scriptdb(config.disk + `/seen/${args[0]}.json`);
		let lastseen = ls.get('seen')

		if (!args[0]) return message.channel.send(userNotFound)

		var d = new Date();
		var time = d.getTime();

		var temp = (time - +lastseen) / 1000;

		setTimeout(() => {
			if (lastseen === undefined) return message.channel.send(userNotFound);
			

			var year = 0, month = 0, day = 0, hour = 0, minutes = 0;
			day = parseInt(temp / 86400)
			month = parseInt(day / 30)
			year = parseInt(month / 12)
			hour = parseInt(((temp - day * 86400) / 3600))
			minutes = parseInt(((temp - day * 86400 - hour * 3600)) / 60)

			var age;
			if(month > 0) {
				age = `${month} tháng`
				if(month > 12) {
					age = `${year} năm`   
				}
			} else {
				if (day > 0) {
					age = `${day} ngày`;
				} else if (day == 0) {
					age = `${hour} giờ ${minutes} phút`;
					if (hour == 0) {
						age = `${minutes} phút`;
					}
				}
			}
			message.channel.send(`${args[0]} hoạt động từ ${age} trước.`)
		}, 1 * 1000);

	}

	if (command === "joindate" || command === "jd") {
		let fj = new Scriptdb(config.disk + `/joindate/${args[0]}.json`)
		let firstjoin = fj.get('date')

		if (!args[0]) return message.channel.send(userNotFound)

		setTimeout(() => {
			if (firstjoin === undefined) return message.channel.send(userNotFound)

			message.channel.send(`Lần đầu thấy ${args[0]} vào ${firstjoin}.`);
		}, 3 * 1000);
	}

	if(command == "help") {
		message.author.send("**Moon 2Y2C Comamnds**\nMoon Bot Discord: https://discord.gg/yrNvvkqp6w\n\n**Comamnds:**\n!help - Xem command bot\n!stats hoặc !kd - Xem kd người chơi. ( kills: 15/01, deaths: 13/01 )\n!joindate hoặc !jd - Xem người chơi lần đầu tham gia server. ( 28/01 )\n!seen - Xem lần cuối nhìn thấy người chơi. ( 02/02 )\n!playtime hoặc !pt - Xem thời gian đã chơi của người chơi. ( 25/02 ) \n!lastmessages - Xem tin nhắn mới nhất của người chơi. ( 14/03 )\n\n!queue, !que hoặc !q - Xem hàng chờ và ưu tiên.\n!normalqueue hoặc !nq - Xem hàng chờ.\n!prio hoặc !prioqueue - Xem hàng chờ ưu tiên.\n!online - Xem người chơi đang online.\n!status - Xem hàng chờ, ưu tiên, online.").catch((e) => {
			message.channel.send("Bật direct message để xem các lệnh.")
		});
	}

	mc.ping({ "host": config.ip }, (err, result) => {
		if (result) {
			try {
				var players = [];
				for (i = 0; result.players.sample.length > i; i++) {
					players.push(result.players.sample[i].name);
				}
				var players2 = players.splice(0, Math.ceil(players.length / 2));
				if (players == []) {
					players.push(players2);
					players2 = ".";
				}
			} catch {
				var players = 'unknown';
				var players2 = 'unknown';
			}

			var old = players.toString().replace(",§6Cựu binh: §l0", "");
			var queue = old.toString().replace("§6Bình thường: §l", "");

			var prio = players2.toString().replace("2y2c §6Queue Size,§6Ưu Tiên: §l", "");
			var status = "Hàng chờ: " + queue + " - Ưu tiên: " + prio + " - Trực tuyến: " + result.players.online;

			// Queue command
			if (command === "queue" || command === "q" || command === "que" || command === "normalqueue") {
				message.channel.send(`Hàng chờ: ${queue} - Ưu tiên: ${prio}`).then(message => {
					message.delete(10000);
				});
			}

			if (command === "prio" || command === "p" || command === "prioqueue") {
				message.channel.send("Ưu tiên: " + prio).then(message => {
					message.delete(10000);
				});
			}

			if (command === "status" || command === "stt") {
				message.channel.send(status).then(message => {
					message.delete(10000);
				});
			}

			// online command
			if (command === "onl" || command === "online" || command === "o") {
				message.channel.send("Trực tuyến: " + result.players.online).then(message => {
					message.delete(10000);
				});
			}
		}
	});
});
