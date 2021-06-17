module.exports = {
    name: "ping",
    aliases: ['pong'],
    
    async execute(client, message, args) {
        message.channel.send('Checking...').then(msg => {
            msg.edit(`Ping: ${msg.createdTimestamp - message.createdTimestamp}ms\nAPI: ${Math.round(client.ping)}ms`)
	        msg => msg.delete(60000)
	    });
    }
}