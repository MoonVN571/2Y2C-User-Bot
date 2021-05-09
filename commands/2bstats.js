var request = require('request');

module.exports = {
    name: "2bstats",
    aliases: ['2bkd'],
    
    async execute(client, message, args) {
		if (!args[0]) return message.channel.send(client.userNotFound);

        request("https://api.2b2t.dev/stats?username=" + args[0], function (error, response, body) {
            var data = JSON.parse(body)[0];
            if(data == undefined) return message.channel.send(client.userNotFound)

            let joins = data.joins
            let leaves = data.leaves
            let deads = data.deaths
            let kills = data.kills

            if (kills === undefined) { kills = 0 }

            if (deads === undefined) { deads = 0 }

            var ratio = kills / deads;
            var ratioFixed = ratio.toFixed(2);

            if (ratioFixed === "NaN" || ratioFixed === "Infinity") {
                ratioFixed = "0.00";
            }

			message.channel.send("2B2T: " + args[0] + " | K: " + kills + " - D: " + deads + " - K/D: " + ratioFixed + " - Joins: " + joins + " - Leaves: " + leaves).catch(e => { message.author.send("**Lỗi:** " + e.toString() + ". Hãy báo cáo cho " + client.authorID); });
		})
    }
}