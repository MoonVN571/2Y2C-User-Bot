module.exports = {
    name: "eval",
    description: "Cho bot chạy dòng code nào đó",
    aliases: ['e'],
    admin: true,
    
    async execute(client, message, args) {
        if(!args.length) return message.channel.send("Nhập code");
        let evaled;
        try {
            evaled = await eval(args.join(' '));
        } catch (err) {
            message.channel.send(`Err: ${err.toString()}`);
        }
    }
}