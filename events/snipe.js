const Database = require('simplest.db');

module.exports = {
    name: "messageDelete",

    execute(client, message) {
        if(message.author.bot || message.author == client.user) return;

        if(message.channel.id == "748529588136837191") return;

        let data = new Database({path: "./snipe.json"});
        
        data.array.push(message.channel.id, {
            content: message.content,
            author: message.author.tag,
            time: Date.now(),
            image: message.attachments.first() ? message.attachments.first().proxyURL : ""
        });
    }
}