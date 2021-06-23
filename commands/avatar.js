module.exports = {
    name: "avatar",
    aliases: ['avt', 'av'],
    
    async execute(client, message, args) {
        var user = args[0];

        var tag = message.mentions.members.first();
        
        if(isNaN(user) && !tag) user = message.author; 
        if(tag) user = tag.id;

        client.fetchUser(user).then(user => {
            if(user == null || user == undefined) return message.channel.send("Không tìm thấy user").then(msg => msg.delete(60000));;
            if(user.avatarURL == undefined || user.avatarURL == null) return message.channel.send("Không có avatar").then(msg => msg.delete(60000));;

            message.channel.send(`${user.avatarURL}`).then(msg => msg.delete(60000))
        });
    }
}