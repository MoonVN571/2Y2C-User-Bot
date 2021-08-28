const { MessageEmbed } = require('discord.js');
var Database = require('simplest.db');

module.exports = {
    name: "blacklist",
    description: "Danh sách đen",
    aliases: ['b'],
    delay: 10, 
    
    async execute(client, message, args) {
        if(!args[0]) {
            let data = new Database({path: './blacklist.json' });

            let get = data.get('users');

            let arr = []

            get.forEach(data => {
                if(client.users.cache.get(data)) arr.push(client.users.cache.get(data).tag);
            });

            if(!arr.length) return message.lineReplyNoMention({embed: {
                description: "Không ai có mặt trong danh sách đen cả.",
                color: client.config.ERR_COLOR
            }}).then(msg => msg.delete({timeout: 60000}));

            var embed = new MessageEmbed()
                        .addField('Danh sách người dùng', arr.join(", "))
                        .addField("\u200B", "Nếu là bạn là admin thì có thể add hoặc remove.")
                        .setColor('GREEN');

            message.lineReplyNoMention(embed).then(msg => msg.delete({timeout: 60000}));
            return;
        }

        let botAdmin = new Database({path: "./config.json"}).get("ADMINS");

        // check commands args & admin
        if(botAdmin.indexOf(message.author.id) < 0 && (args[0] == "add" | args[0] == "remove")) return message.lineReplyNoMention({embed: {
            description: "Đã bảo là lệnh dành cho ADMIN rồi.",
            color: client.config.ERR_COLOR
        }}).then(msg => msg.delete({timeout: 60000}));

        if(args[0] == "add") {
            if(!args[1]) return message.lineReplyNoMention({embed: {
                description: "Hãy cung cấp người dùng cần thêm.",
                color: client.config.ERR_COLOR
            }}).then(msg => msg.delete({timeout: 60000}));

            var user = args[1];
            var tag = message.mentions.members.first();

            if(tag) user = tag.id;
            
            if(isNaN(user) && !tag) return message.lineReplyNoMention({embed: {
                description: "Bạn phải cung cấp ID hoặc tag người dùng.",
                color: client.config.ERR_COLOR
            }}).then(msg => msg.delete({timeout: 60000}));

            client.users.fetch(user).then(user => {
                if(!user) return message.lineReplyNoMention({embed: {
                    description: "Không tìm thấy người này.",
                    color: client.config.ERR_COLOR
                }}).then(msg => msg.delete({timeout: 60000}));

                let data = new Database({path: './blacklist.json' });
                let get = data.get('users');

                if(get.indexOf(user.id) > -1) return message.lineReplyNoMention({embed: {
                    description: user.tag + " đã ở trong danh sách đen.",
                    color: client.config.ERR_COLOR
                }}).then(msg => msg.delete({timeout: 60000}));

                data.array.push('users', user.id);

                message.lineReplyNoMention({embed: {
                    description: user.tag + " đã được thêm vào danh sách đen.",
                    color: client.config.DEF_COLOR
                }}).then(msg => msg.delete({timeout: 60000}));
            });
        }

        if(args[0] == "remove") {

            if(!args[1]) return message.lineReplyNoMention({embed: {
                description: "Hãy cung cấp người dùng cần thêm.",
                color: client.config.ERR_COLOR
            }}).then(msg => msg.delete({timeout: 60000}));

            var user = args[1];
            var tag = message.mentions.members.first();
            
            if(tag) user = tag.id;
            
            if(isNaN(user) && !tag) return message.lineReplyNoMention({embed: {
                description: "Bạn phải cung cấp ID hoặc tag người dùng.",
                color: client.config.ERR_COLOR
            }}).then(msg => msg.delete({timeout: 60000}));

            client.users.fetch(user).then(user => {
                if(!user) return message.lineReplyNoMention({embed: {
                    description: "Không tìm thấy người này.",
                    color: client.config.ERR_COLOR
                }}).then(msg => msg.delete({timeout: 60000}));

                let data = new Database({path: './blacklist.json' });
                let get = data.get('users');
                
                if(get.indexOf(user.id) < 0) return message.lineReplyNoMention({embed: {
                    description: user.tag + " không có trong danh sách đen.",
                    color: client.config.ERR_COLOR
                }}).then(msg => msg.delete({timeout: 60000}));

                data.array.extract('users', user.id);

                message.lineReplyNoMention({embed: {
                    description: user.tag + " đã được xoá khỏi danh sách đen.",
                    color: client.config.DEF_COLOR
                }}).then(msg => msg.delete({timeout: 60000}));
            });

        }
    }
}