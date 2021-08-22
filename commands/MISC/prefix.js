const Database = require('simplest.db');

module.exports = {
    name: "prefix",
    description: "Đặt prefix bot cho riêng bạn",
    delay: 60,

    execute(client, message, args) {
        if(!args[0]) return message.lineReplyNoMention({embed: {
            description: "Cung cấp prefix của bạn muốn đặt cho bạn.\n\n" + client.prefix + "prefix <KEY>",
            color: client.config.ERR_COLOR
        }}).then(msg => msg.delete({timeout: 60000}));

        if(args[1]) return message.lineReplyNoMention({embed: {
            description: "Định dạng prefix không hợp lệ.",
            color: client.config.ERR_COLOR
        }}).then(msg => msg.delete({timeout: 60000}));

        let data = new Database({path: "./prefix.json"});

        if(data.get(message.author.id + ".prefix") == args[0]) return message.lineReplyNoMention({embed: {
            description: "Bạn đã đặt prefix này trước đó rồi.",
            color: client.config.ERR_COLOR
        }}).then(msg => msg.delete({timeout: 60000}));

        if(message.mentions.members.first() == client.user) return message.lineReplyNoMention({embed: {
            description: "Bạn không thể dùng bot làm prefix.",
            color: client.config.ERR_COLOR
        }}).then(msg => msg.delete({timeout: 60000}));

        message.lineReplyNoMention({embed: {
            description: "Đã đặt prefix cho bạn là **" + args[0].toLowerCase() + "**.",
            color: client.config.DEF_COLOR
        }}).then(msg => msg.delete({timeout: 60000}));

        data.set(message.author.id + ".prefix", args[0].toLowerCase());

    }
}