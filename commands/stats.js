var Scriptdb = require('script.db');

module.exports = {
    name: "stats",
    aliases: ['kd'],
    
    async execute(client, message, args) {
		if (!args[0]) return message.channel.send(client.userNotFound)

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

        message.channel.send("**" + args[0] + "**: [K: " + kills + " - D: " + deads + " - K/D: " + ratioFixed + "]").catch(e => { message.author.send("**Lỗi:** " + e.toString() + ". Hãy báo cáo cho " + client.authorID); });
    }
}