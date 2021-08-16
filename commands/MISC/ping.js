module.exports = {
    name: "ping",
    description: "Xem tốc độ phản hồi của bot",
    delay: 10,

    async execute(client, message, args) {
        message.channel.send('Checking...').then(msg => {
            msg.edit(`Ping: ${msg.createdTimestamp - message.createdTimestamp}ms\nAPI: ${Math.round(client.ws.ping)}ms`);
            msg.delete({timeout: 60000});
	    });
    }
}