const request = require('request');
var { RichEmbed } = require('discord.js');

var apiNew = require('../api');
var api = new apiNew();

module.exports = {
    name: "2bseen",
    aliases: ['2blastseen', '2bsee'],
    
    async execute(client, message, args) {
        if (!args[0]) return message.channel.send(client.userNotFound);

        request('https://api.2b2t.dev/seen?username=' + args[0], function (error, response, body) {
            var data = JSON.parse(body)[0];

            if(data == undefined) return message.channel.send(client.userNotFound)

            let seen = data.seen;

            var toTime = new Date(seen);

            var age = api.ageCalc(toTime);

		    var embed = new RichEmbed()
                        .setDescription(`2B2T: Đã thấy ${args[0]} từ ${age} trước.`)
                        .setColor(0x2EA711);

            message.channel.send(embed).catch(e => { 
                message.author.send("**Lỗi:** " + e.toString() + ". Hãy báo cáo cho " + client.authorID + ".") 
            }).then(msg => msg.delete(60000));
        })
    }
}