var request = require('request');

var ab = require('../api');
var api = new ab();

module.exports = {
    name: "2bseen",
    aliases: ['2bsee'],

    async execute(client, message, args) {
        if (!args[0]) return message.channel.send(client.userNotFound);

        request('https://api.2b2t.dev/seen?username=' + args[0], function (error, response, body) {
            var data = JSON.parse(body)[0];

            if(data == undefined) return message.channel.send(client.userNotFound)

            let seen = data.seen;
            var toTime = new Date(seen);

            var age = api.ageCalc(toTime);

            message.channel.send(`2B2T: Đã thấy ${args[0]} từ ${age} trước.`);
        });
    }
}
