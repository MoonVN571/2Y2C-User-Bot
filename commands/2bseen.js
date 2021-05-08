var superagent = require('superagent');

module.exports = {
    name: "2bseen",
    aliases: [''],
    
    async execute(client, message, args) {
		if (!args[0]) return message.channel.send(client.userNotFound);

        superagent.get("https://api.2b2t.dev/seen?username=" + args[0]).end((err, data) => {
            if(data.body[0] == undefined) return message.channel.send(client.userNotFound)

            let seen = data.body[0].seen

            var toTime = new Date(seen);

            var age = api.ageCalc(toTime);

            message.channel.send(`2B2T: Đã thấy ${args[0]} từ ${age} trước.`);
		});
    }
}