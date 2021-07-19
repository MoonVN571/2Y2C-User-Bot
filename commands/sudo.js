module.exports = {
    name: "sudo",
    aliases: ['say'],
    
    async execute(client, message, args) {
        if(message.author.id == "425599739837284362") {
            message.channel.send(message.content.substr(message.content.split(" ")[0].length + 1))
        }
    }
}