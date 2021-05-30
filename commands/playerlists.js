const { MessageEmbed } = require('discord.js');
var Scriptdb = require('script.db');

module.exports = {
    name: "playerlist",
    aliases: ['playerlist', 'pl'],
    
    async execute(client, message, args) {
        var db = new Scriptdb('./data.json');

        var playerArray = db.get('players');

        var count = playerArray.length;

        message.channel.send("Đang tính toán...").then(msg => {
            var ping = (msg.createdTimestamp - message.createdTimestamp);

            var embed = new MessageEmbed()
                            .setTitle("Player list")
                            .setDescription("Đã tải trong " + ping + "ms")
                            .addField('Trực tuyến', count, false)
                            .addField('Người chơi', '``' + playerArray.join(', ') + "``", false);
            msg.edit(embed);
        })
    }
}