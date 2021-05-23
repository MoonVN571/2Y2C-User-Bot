module.exports = {
    name: "avatar",
    aliases: ['avt', 'av'],
    
    async execute(client, message, args) {
        const user = message.mentions.users.first() || message.author;

        message.channel.send(`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256`)
        
    }
}