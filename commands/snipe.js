module.exports = {
    name: "snipe",
    aliases: [''],
    
    async execute(client, message, args) {

        var sniper = client.snipes.get(message.channel.id);
        
        if(!sniper) return message.channel.send("nothing to snipes!").then(msg => msg.delete(60000));

        message.channel.send("**" + sniper.author + "** " + sniper.content + sniper.image).then(msg => msg.delete(60000));
    }
}