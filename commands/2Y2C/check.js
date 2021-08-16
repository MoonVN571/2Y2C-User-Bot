var Scriptdb = require('script.db');

module.exports = {
    name: "check",
    description: "Kiểm tra người chơi online hay không",
    aliases: ['checkplayer'],
    
    async execute(client, message, args) {
        var db = new Scriptdb(client.disk + '/data.json');

        var playerArray = db.get('players');

        if(!playerArray) return message.lineReplyNoMention({embed: {
            description: "Bot chưa kết nối đến server!",
            color: client.config.ERR_COLOR
        }}).then(msg => msg.delete({timeout: 60000}));

        var data = playerArray.toString();

        if(!args[0]) return message.lineReplyNoMention({embed: {
            description: "Nhập tên người dùng cần kiểm tra.",
            color: client.config.ERR_COLOR
        }}).then(msg => msg.delete({timeout: 60000}));

        if(data.includes(args[0])) {
            message.lineReplyNoMention({embed: {
                description: args[0] + " đang online!",
                color: client.config.DEF_COLOR
            }}).then(msg => msg.delete({timeout: 60000}));
        } else {
            message.lineReplyNoMention({embed: {
                description: args[0] + " không online!",
                color: client.config.DEF_COLOR
            }}).then(msg => msg.delete({timeout: 60000}));
        }
    }
}