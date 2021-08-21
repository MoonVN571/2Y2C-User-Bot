const request = require('request');
var { MessageEmbed } = require('discord.js');

var a = require('../../api');
var api = new a();

module.exports = {
    name: "2bseen",
    description: "Xem lần cuối bot nhìn thấy người chơi",
    aliases: ['2blastseen', '2bsee'],
    delay: 10,
    
    async execute(client, message, args) {
        if (!args[0]) return message.channel.send(client.inputUsername).then(msg => msg.delete({timeout: 60000}));

        request('https://api.2b2t.dev/seen?username=' + args[0], function (error, response, body) {
            var data = JSON.parse(body)[0];

            if(data == undefined) return message.channel.send(client.userNotFound);

            let seen = data.seen;

            var toTime = new Date(seen);

            var age = api.ageCalc(toTime);

		    var embed = new MessageEmbed()
                        .setDescription(`2B2T: Đã thấy ${args[0]} từ ${age} trước.`)
                        .setColor(0x2EA711);

            message.lineReplyNoMention(embed).then(msg => msg.delete({timeout: 60000}));
        })
    }
}