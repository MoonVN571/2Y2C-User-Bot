module.exports = {
    name: "sudo",
    description: "Gửi tin nhắn",
    aliases: ['say'],
    
    execute(client, message, args) {
        if(client.config.ADMINS.indexOf(message.author.id) > 0) {
            if(client.channels.cache.get(args[0])) {
                client.channels.cache.get(args[0]).send(args.join(" ").split(args[0])[1]);
            } else {
                message.channels.send(args.join(" "));
            }
        }
    }
}