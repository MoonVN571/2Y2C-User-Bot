var Scriptdb = require('script.db');
var Discord = require('discord.js');

module.exports = {
    name: "stats",
    description: "stats command.",
    aliases: ['kd', 'stats'],
    
    async execute(client, message, args) {
        if (!args[0]) return message.channel.send(client.userNotFound);

		const kd = new Scriptdb(`${client.config.disK}/data/kd/${args[0]}.json`);
		let deads = kd.get('deaths');
		let kills = kd.get('kills');

		if (kills === undefined) { kills = 0 }

		if (deads === undefined) { deads = 0 }

		var ratio = kills / deads;
		var ratioFixed = ratio.toFixed(2);

		if (ratioFixed === "NaN" || ratioFixed === "Infinity") {
			ratioFixed = "0.00";
		}

        var embed = new Discord.RichEmbed()
                        .setAuthor(`${args[0]}'s statistics`, `https://minotar.net/helm/${args[0]}`, `https://namemc.com/` + args[0])
                        .addField(`Kills`, `${kills}`, true)
                        .addField(`Deaths`, `${deads}`, true )
                        .addField(`K/D Ratio`, `${ratioFixed}`, true )
                        .setThumbnail(`https://minotar.net/helm/${args[0]}`)
                        .setColor(0x2EA711)
                        .setFooter(client.footer, 'https://cdn.discordapp.com/avatars/768448728125407242/aa2ce1d9374de6fc0dd28d349ca135af.webp?size=1024')
                        .setTimestamp();

        message.channel.send(embed);
    }
}