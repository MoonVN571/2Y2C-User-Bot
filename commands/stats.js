var Scriptdb = require('script.db');
var Discord = require('discord.js');

module.exports = {
    name: "stats",
    description: "stats command.",
    aliases: ['kd', 'stats'],
    
    async execute(client, message, args) {
        if (!args[0]) return message.channel.send(client.userNotFound);

		const kd = new Scriptdb(`${client.config.disk}/data/kd/${args[0]}.json`);
		let deads = kd.get('deaths');
		let kills = kd.get('kills');

		if (kills === undefined && deads == undefined) return message.channel.send(client.userNotFound);
        
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
                        .setFooter(client.footer, 'https://cdn.discordapp.com/avatars/768448728125407242/f18ec971961b23db96e6cf0f3f79ec1c.png?size=256')
                        .setTimestamp();

        message.channel.send(embed);
    }
}