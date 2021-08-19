const axios = require('axios');

require('dotenv').config();

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
            let banner = await getUserBannerUrl(user.id, { size: 4096 });

            if(!banner) return message.lineReplyNoMention({embed: {
                description: "Không tìm thấy ảnh nền của người này.",
                color: client.config.ERR_COLOR
            }}).then(msg => msg.delete({timeout: 60000}));
            

            message.lineReplyNoMention({embed: {
                title: "Ảnh nền của " + user.tag + "'s",
                description: "so cuteeee",
                image: { url: banner },
                color: client.config.DEF_COLOR,
                image: {
                    url: user.avatarURL({ format: 'png', dynamic: true, size: 1024 }) 
                },
            }}).then(msg => msg.delete({timeout: 60000}));
        });

        /**
         * https://stackoverflow.com/questions/68334431/get-user-banner-in-discord-js
         */
        async function getUserBannerUrl(userId, { dynamicFormat = true, defaultFormat = "webp", size = 512 } = {}) {
            if (![16, 32, 64, 128, 256, 512, 1024, 2048, 4096].includes(size)) {
                throw new Error(`The size '${size}' is not supported!`);
            }

            if (!["webp", "png", "jpg", "jpeg"].includes(defaultFormat)) {
                throw new Error(`The format '${defaultFormat}' is not supported as a default format!`);
            }
            
            const user = await client.api.users(userId).get();
            if (!user.banner) return null;
        
            const query = `?size=${size}`;
            const baseUrl = `https://cdn.discordapp.com/banners/${userId}/${user.banner}`;

            if (dynamicFormat) {
                const { headers } = await axios.head(baseUrl);
                if (headers && headers.hasOwnProperty("content-type")) {
                    return baseUrl + (headers["content-type"] == "image/gif" ? ".gif" : `.${defaultFormat}`) + query;
                }
            }
            return baseUrl + `.${defaultFormat}` + query;
        }

    }
}