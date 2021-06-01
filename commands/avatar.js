module.exports = {
    name: "avatar",
    aliases: ['avt', 'av'],
    
    async execute(client, message, args) {
        const user = message.mentions.users.first() || message.author;

        if(user.id == "425599739837284362") return message.channel.send("Huỷ yêu cầu avtar!");

        message.channel.send(`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256`)
    }
}