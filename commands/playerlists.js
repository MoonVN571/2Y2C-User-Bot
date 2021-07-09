var Scriptdb = require('script.db');

module.exports = {
    name: "playerlist",
    aliases: ['playerlist', 'pl'],
    
    async execute(client, message, args) {
        var db = new Scriptdb(client.config.disk + '/data.json');

        var playerArray = db.get('players');

        if(playerArray == undefined) return message.channel.send("Bot chưa kết nối đến server!");

        var count = playerArray.length;

        message.channel.send("Đang tính toán...").then(msg => {
            msg.edit("**PLAYER LIST**\nNhập tên để check người chơi có online hay không. Thí dụ: !check <tên>\n\nTrực tuyến: " + count + "\n\n**Players:** \n" + playerArray.join(', '));
            msg.delete(120000);
	    });
    }
}