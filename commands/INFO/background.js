require('dotenv').config();

const axios = require("axios");

module.exports = {
    name: "background",
    description: "Lấy background ai đó.",
    aliases: ['bg'],

    execute(client, message, args) {
        var user = args[0];        
        var tag = message.mentions.members.first();
        
        if(isNaN(user) && !tag) user = message.author.id; 
        if(tag) user = tag.id;

        let check_name = client.users.cache.find(user => user.username.toLowerCase() == args.join(" ").toLowerCase());
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
            let banner = await getUserBannerUrl2(user.id);

            if(!banner) return message.lineReplyNoMention({embed: {
                description: "Không tìm thấy ảnh nền của người này.",
                color: client.config.ERR_COLOR
            }}).then(msg => msg.delete({timeout: 60000}));
            

            await message.lineReplyNoMention({embed: {
                title: "Banner của " + user.username + "'s",
                description: `[Link ảnh](${banner})`,
                image: { url: banner },
                footer: {
                    text: "Yêu cầu bởi " + message.author.tag,
                },
                color: client.config.DEF_COLOR
            }}).then(msg => msg.delete({timeout: 60000}));
        });

        async function getUserBannerUrl(userId) {
            const user = await client.api.users(userId).get();
            return user.banner ? `https://cdn.discordapp.com/banners/${userId}/${user.banner}` : null;
        }

        async function getUserBannerUrl2(userId, { dynamicFormat = true, defaultFormat = "png", size = 4096 } = {}) {

            // Supported image sizes, inspired by 'https://discord.js.org/#/docs/main/stable/typedef/ImageURLOptions'.
            if (![16, 32, 64, 128, 256, 512, 1024, 2048, 4096].includes(size)) {
                throw new Error(`The size '${size}' is not supported!`);
            }
        
            // We don't support gif as a default format,
            // because requesting .gif format when the original image is not a gif,
            // would result in an error 415 Unsupported Media Type.
            // If you want gif support, enable dynamicFormat, .gif will be used when is it available.
            if (!["webp", "png", "jpg", "jpeg"].includes(defaultFormat)) {
                throw new Error(`The format '${defaultFormat}' is not supported as a default format!`);
            }
        
            // We use raw API request to get the User object from Discord API,
            // since the discord.js v12's one doens't support .banner property.
            const user = await client.api.users(userId).get();
            if (!user.banner) return null;
        
            const query = `?size=${size}`;
            const baseUrl = `https://cdn.discordapp.com/banners/${userId}/${user.banner}`;
        
            // If dynamic format is enabled we perform a HTTP HEAD request,
            // so we can use the content-type header to determine,
            // if the image is a gif or not.
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