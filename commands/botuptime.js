module.exports = {
    name: "botuptime",
    aliases: ['bu'],
    
    async execute(client, message, args) {
        var temp = parseInt(process.uptime());

        var day = 0, hours = 0, minutes = 0, seconds = 0;
        day = parseInt((temp/ 86400))
        hours = parseInt(((temp - day * 86400) / 3600))
        minutes = parseInt(((temp - day * 86400 - hours * 3600)) / 60)
        seconds = parseInt(temp % 60)

        message.channel.send(day + "d " + hours + "h " + minutes + "m " + seconds + "s")
    }
}