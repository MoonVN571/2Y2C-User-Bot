var Scriptdb = require('script.db');

module.exports = {
    name: "snipe",
    aliases: [''],
    
    async execute(client, message, args) {
        var data = new Scriptdb('./snipe.json');

        var checkchannel = data.get(message.channel.id + ".content");

        if(checkchannel) {
            var sniper = data.get(message.channel.id + ".content");
            var author = data.get(message.channel.id + ".author");
            
            client.fetchUser(author).then(user => {
                message.channel.send("**" + user.tag + "** " + sniper);
            })
        }
    }
}