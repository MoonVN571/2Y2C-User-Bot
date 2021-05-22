var request = require('request');
var Discord = require('discord.js');

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

            var embed = new Discord.RichEmbed()
                            .setAuthor(`${args[0]}'s statistics`, `https://minotar.net/helm/${args[0]}`, `https://namemc.com/${args[0]}`)
                            .addField(`Kills`, `${kills}`, true)
                            .addField(`Deaths`, `${deads}`, true)
                            .addField(`K/D Ratio`, `${ratioFixed}`, true)
                            .addField(`Joins`, `${joins}`, true)
                            .addField(`Leaves`, `${leaves}`, true)
                            .setThumbnail(`https://minotar.net/armor/bust/${args[0]}`)
                            .setColor(0x2EA711)
                            .setFooter("API by LoLRiTTeR Bot", 'https://images-ext-2.discordapp.net/external/OWsrCus2cCb9txmasSQQ8UqxrkbIxM2f1VotLB8aX14/https/cdn.discordapp.com/avatars/521791765989031957/6e34a1a33d255339aa45c731637a51f8.png')
                            .setTimestamp();

            message.channel.send(embed).catch(e => { 
                message.author.send("**Lỗi:** " + e.toString() + ". Hãy báo cáo cho " + client.authorID + ".") 
            });
        })
    }
}