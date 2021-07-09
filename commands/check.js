var Scriptdb = require('script.db');

module.exports = {
    name: "check",
    aliases: ['checkplayer', ''],
    
    async execute(client, message, args) {
        var db = new Scriptdb(client.config.disk + '/data.json');

        var playerArray = db.get('players');

        if(playerArray == undefined) return message.channel.send("Bot chưa kết nối đến server!");

        var data = palyerArray.toStirng();

        if(!args[0]) return message.channel.send("Bạn cần nhập tên người chơi để kiểm tra.");

        if(data.includes(args[0])) {
            message.channel.send("Người chơi **" + args[0] +"** đang online!");
        } else { 
            message.channel.send("Người chơi **" + args[0] +"** không online!");
        }
    }
}