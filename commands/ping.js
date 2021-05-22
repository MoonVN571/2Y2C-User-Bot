module.exports = {
    name: "ping",
    aliases: ['pong'],
    
    async execute(client, message, args) {
        message.channel.send('Checking...').then(msg => {
            msg.edit(`${msg.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`)
        })
    }
}