module.exports = {
    name: "ping",
    description: "Xem tốc độ phản hồi của bot",
    delay: 10,

    async execute(client, message, args) {
        message.channel.send('Checking...').then(msg => {
            msg.edit("", {embed: {
                description: "Độ trễ: " + (msg.createdTimestamp - message.createdTimestamp) + "ms"
                + "\n" + "Tốc độ phản hồi từ API: " + client.ws.ping + "ms",
                color: client.config.DEF_COLOR 
            }});
            msg.delete({timeout: 60000});
	    });
    }
}