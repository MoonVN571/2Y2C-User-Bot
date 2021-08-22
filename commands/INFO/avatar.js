module.exports = {
    name: "avatar",
    description: "Xem avatar người dùng",
    aliases: ['avt', 'av'],
    
    async execute(client, message, args) {
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

        client.users.fetch(user).then(user => {
            if(!user) return message.lineReplyNoMention({embed: {
                description: "Không tìm thấy người này.",
                color: client.config.ERR_COLOR
            }}).then(msg => msg.delete({timeout: 60000}));

            if(!user.avatarURL()) return message.lineReplyNoMention({embed: {
                description: "Không tìm thấy avatar của người này.",
                color: client.config.ERR_COLOR
            }}).then(msg => msg.delete({timeout: 60000}));
            
            message.lineReplyNoMention({embed: {
                title: "Ảnh của " + user.username + "'s",
                description: "Nhỏ nhưng chất lượng hehe",
                image: {
                    url: user.avatarURL({ format: "png", dynamic: true, size: 64 }) 
                },
                footer: {
                    text: "Yêu cầu bởi " + message.author.tag + ".",
                },
                color: client.config.DEF_COLOR
            }}).then(msg => msg.delete({timeout: 60000}));
        });
    }
}