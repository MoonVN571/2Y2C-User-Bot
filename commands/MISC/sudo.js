module.exports = {
    name: "sudo",
    description: "Gửi tin nhắn",
    aliases: ['say'],
    
    execute(client, message, args) {
        if(client.config.ADMINS.indexOf(message.author.id) == 0) {
            message.channel.send(args.join(" "));
        }
    }
}