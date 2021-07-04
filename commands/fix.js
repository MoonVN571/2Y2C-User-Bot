module.exports = {
    name: "fix",
    aliases: ['f'],
    
    async execute(client, message, args) {
        message.channel.stopTyping(); 
        message.channel.send("Stopped");
    }
}