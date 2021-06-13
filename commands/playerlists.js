var Scriptdb = require('script.db');

module.exports = {
    name: "playerlist",
    aliases: ['playerlist', 'pl'],
    
    async execute(client, message, args) {
        var db = new Scriptdb(client.config.disk + '/data.json');

        var playerArray = db.get('players');

        if(playerArray == undefined) return message.channel.send("Bot chưa kết nối vào server hoặc server không hoạt động.")

        var count = playerArray.length;

        message.channel.send("Đang tính toán...").then(msg => {
            msg.edit("**PLAYER LIST**\n\nTrực tuyến: " + count + "\n\n**Players:** \n" + playerArray.join(', ')).then(msg => msg.delete(60000));
        }).then(msg => msg.delete(60000));
    }
}