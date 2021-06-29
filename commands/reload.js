module.exports = {
    name: "reload",
    description: "",
    aliases: ['rl'],
    
    async execute(client, message, args) {
        if(message.author.id !== "425599739837284362")
            return message.channel.send("Bạn phải là nhà phát triển để sử dụng lệnh này.").then(msg => msg.delete(60000));

        delete require.cache[require.resolve(`../commands/${args[0]}.js`)];

        const cmd = require(`../commands/${args[0]}`);
        client.commands.set(cmd.name, cmd);
        
        message.channel.send(`Đã tải lại command ${args[0]}`).then(msg => msg.delete(60000));
    }
}