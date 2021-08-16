module.exports = {
    name: "avatar",
    description: "Xem avatar người dùng",
    aliases: ['avt', 'av'],
    
    async execute(client, message, args) {
        var user = args[0];        

        var tag = message.mentions.members.first();
        
        if(isNaN(user) && !tag) user = message.author.id; 
        if(tag) user = tag.id;

        if(!tag && isNaN(user)) return message.lineReplyNoMention({embed: {
            description: "Bạn phải cung cấp ID hoặc tag người dùng.",
            color: client.config.ERR_COLOR
        }}).then(msg => msg.delete({timeout: 60000}));

        client.users.fetch(user).then(user => {
            if(user == null || user == undefined) return message.lineReplyNoMention({embed: {
                description: "Không tìm thấy người này.",
                color: client.config.ERR_COLOR
            }}).then(msg => msg.delete({timeout: 60000}));

            if(!user.avatarURL()) return message.lineReplyNoMention({embed: {
                description: "Không tìm thấy avatar của người này.",
                color: client.config.ERR_COLOR
            }}).then(msg => msg.delete({timeout: 60000}));
            
            message.channel.send({embed: {
                title: "Ảnh của " + user.username + "'s",
                description: "cute nhó",
                image: {
                    url: user.avatarURL({ format: 'png', dynamic: true, size: 1024 }) 
                },
                footer: "Yêu cầu bởi " + message.author.tag + ".",
                color: client.config.DEF_COLOR
            }}).then(msg => msg.delete({timeout: 60000}));
        });
    }
}