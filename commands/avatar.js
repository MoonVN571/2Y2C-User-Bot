module.exports = {
    name: "avatar",
    aliases: ['avt', 'av'],
    
    async execute(client, message, args) {
        var user = message.mentions.users.first() || message.author;

        if(user == null) return message.channel.send("Không tìm thấy user");

        if(user.id == "425599739837284362" || user.id == "817029429401616414") return message.channel.send("Huỷ yêu cầu avatar");

        if(user.avatar == null) return message.channel.send("Không có avatar");
        
        message.channel.send(`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256`).then(msg => msg.delete(60000))
    }
}