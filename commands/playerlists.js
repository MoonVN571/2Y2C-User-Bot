const { RichEmbed } = require('discord.js');
var Scriptdb = require('script.db');

module.exports = {
    name: "playerlist",
    aliases: ['playerlist', 'pl'],
    
    async execute(client, message, args) {
        var db = new Scriptdb(client.config.disk + '/data.json');

        var playerArray = db.get('players');

        if(playerArray == undefined) return message.channel.send("Bot chưa kết nối vào server hoặc server không hoạt động.")

        var count = playerArray.length;

        message.channel.send("Đang tính toán...").then(msg => {
            var ping = (msg.createdTimestamp - message.createdTimestamp);

            var embed = new RichEmbed()
                            .setTitle("Player list")
                            .setDescription("Đã tải trong " + ping + "ms")
                            .addField('Trực tuyến', count, false)
                            .addField('Người chơi', '``' + playerArray.join(', ') + "``", false);
            msg.edit(embed);
        })
    }
}