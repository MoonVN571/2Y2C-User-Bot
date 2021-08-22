const axios = require('axios');

require('dotenv').config();
const fetch = require('node-fetch')

module.exports = {
    name: "background",
    description: "Lấy background ai đó.",
    aliases: ['bg'],

    execute(client, message, args) {
        var user = args[0];        
        var tag = message.mentions.members.first();
        
        if(isNaN(user) && !tag) user = message.author.id; 
        if(tag) user = tag.id;

        let check_name = client.users.cache.find(user => user.username == args.join(" "));
        if(check_name) user = check_name.id;

        if(!check_name && !tag && isNaN(user)) return message.lineReplyNoMention({embed: {
            description: "Bạn phải cung cấp ID hoặc tag người dùng.",
            color: client.config.ERR_COLOR
        }}).then(msg => msg.delete({timeout: 60000}));

        if(!tag && isNaN(user)) return message.lineReplyNoMention({embed: {
            description: "Bạn phải cung cấp ID hoặc tag người dùng.",
            color: client.config.ERR_COLOR
        }}).then(msg => msg.delete({timeout: 60000}));

        client.users.fetch(user).then(async user => {
            let banner = await getUserBannerUrl(user.id);

            if(!banner) return message.lineReplyNoMention({embed: {
                description: "Không tìm thấy ảnh nền của người này.",
                color: client.config.ERR_COLOR
            }}).then(msg => msg.delete({timeout: 60000}));
            

            await message.lineReplyNoMention({embed: {
                title: "Banner của " + user.username + "'s",
                description: "Nhỏ nhưng chất lượng nhe",
                image: { url: banner },
                footer: {
                    text: "Yêu cầu bởi " + message.author.tag + ".",
                },
                color: client.config.DEF_COLOR
            }}).then(msg => msg.delete({timeout: 60000}));
        });

        async function getUserBannerUrl(userId) {
            const user = await client.api.users(userId).get();
            return user.banner ? `https://cdn.discordapp.com/banners/${userId}/${user.banner}` : null;
        }

    }
}