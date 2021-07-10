const { RichEmbed } = require('discord.js');
var Scriptdb = require('script.db');

module.exports = {
    name: "blacklist",
    aliases: ['b'],
    
    async execute(client, message, args) {
        if(!args[0]) return  message.channel.send("add, remove or list?").then(msg => msg.delete(60 * 1000));
        
        var data = new Scriptdb('./blacklist.json');

        if(args[0] == "list") {
            var get = data.get('list');

            let arr = []

            get.split(" ").forEach(data => {
                if(client.users.get(data)) arr.push(client.users.get(data).tag);
            })

            // get + "\n\n" + arr.join(", ")
            var embed = new RichEmbed()
                        .addField('User list', get.split(" ").join(" "))
                        // .addField('\u200B', '\u200B')
                        .addField('User tag', arr.join(", "))
                        .setColor('GREEN')
                        .setFooter(client.footer);

            message.channel.send(embed).then(msg => msg.delete(60 * 1000));
        }

        if(message.author.id !== "425599739837284362") return message.channel.send("Lệnh cho dev địt mẹ mày. " + message.author).then(msg => msg.delete(60 * 1000));

        if(args[0] == "add") {
            var get = data.get('list');

            if(!args[1]) return message.channel.send("Nhập id/tag").then(msg => msg.delete(60 * 1000));

            var user = args[1];

            var tag = message.mentions.members.first();
            
            if(isNaN(user) && !tag) return message.channel.send("không tìm thấy user").then(msg => msg.delete(60 * 1000));
            if(tag) user = tag.id;

            client.fetchUser(user).then(user => {
                if(get.includes(user.id)) return message.channel.send(user.tag + " đã có trong blacklist.").then(msg => msg.delete(60 * 1000));

                if(!user) return message.channel.send("không tìm thấy user").then(msg => msg.delete(60 * 1000));

                data.set('list', get + " " + user.id);

                message.channel.send("đã add " + user.tag).then(msg => msg.delete(60 * 1000));
            });
        }

        if(args[0] == "remove") {

            // dạng db: 123 123 123
            var get = data.get('list');

            if(!args[1]) return message.channel.send("Nhập id/tag").then(msg => msg.delete(60 * 1000));

            var user = args[1];

            var tag = message.mentions.members.first();
            
            if(isNaN(user) && !tag) return message.channel.send("không tìm thấy user").then(msg => msg.delete(60 * 1000));
            if(tag) user = tag.id;

            client.fetchUser(user).then(user => {
                if(!user) return message.channel.send("không tìm thấy user").then(msg => msg.delete(60 * 1000));

                if(!get.includes(user.id)) return message.channel.send("Không tìm thấy " + user.tag + ".").then(msg => msg.delete(60 * 1000));

                data.set('list', get.replace(user.id, ""));

                message.channel.send("đã remove " + user.tag).then(msg => msg.delete(60 * 1000));
            });

        }
    }
}