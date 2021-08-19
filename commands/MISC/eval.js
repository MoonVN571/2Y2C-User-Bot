module.exports = {
    name: "eval",
    description: "Cho bot chạy dòng code nào đó",
    aliases: ['e'],
    
    async execute(client, message, args) {
        if(client.config.ADMINS.indexOf(message.author.id) == -1) return;

        if(!args.length) return message.channel.send("Nhập code");
        let evaled;
        try {
            evaled = await eval(args.join(' '));
        } catch (err) {
            message.channel.send(`Err: ${err.toString()}`);
        }
    }
}