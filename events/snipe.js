const Database = require('simplest.db');

module.exports = {
    name: "messageDelete",

    execute(client, message) {
        if(message.author.bot || message.author == client.user) return;
        let data = new Database({path: "./snipe.json"});
        
        data.set(message.channel.id + ".content", message.content);
        data.set(message.channel.id + ".author", message.author.tag);
        data.set(message.channel.id + ".time", Date.now());
        data.set(message.channel.id + '.image', message.attachments.first() ? message.attachments.first().proxyURL : "");
    }
}