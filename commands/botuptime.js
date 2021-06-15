module.exports = {
    name: "botuptime",
    aliases: ['bu'],
    
    async execute(client, message, args) {
        var temp = parseInt(process.uptime());

        var day = hours = 0, minutes = 0, seconds = 0;
        hours = parseInt(((temp - day * 86400) / 3600))
        minutes = parseInt(((temp - day * 86400 - hours * 3600)) / 60)
        seconds = parseInt(temp % 60)

        message.channel.send(hours + "h " + minutes + "m " + seconds + "s")
    }
}