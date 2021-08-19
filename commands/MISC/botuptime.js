var a = require("../../api");
var api = new a();

module.exports = {
    name: "botuptime",
    description: "Xem thời gian đã hoạt động của bot",
    aliases: ['bu'],
    delay: 10,
    
    async execute(client, message, args) {
        var temp = parseInt(process.uptime());

        message.lineReplyNoMention({embed: {
            description: "Thời gian đã hoạt động: **" + api.calculate(temp) + "**.",
            color: client.config.DEF_COLOR
        }}).then(msg => msg.delete({timeout: 60000}));
    }
}