module.exports = {
    name: "nickname",
    description: "Đổi nickname của bot",
    aliases: ['nick'],

    execute(client, message, args) {
        if(client.config.ADMINS.indexOf(message.author.id) == -1) return;

        if(!args.length) message.lineReplyNoMention({embed: {
            description: "Hãy nhập biệt danh cần thay đổi",
            color: client.config.DEF_COLOR
        }});

        message.guild.members.cache.get(client.user.id).setNickname("[" + client.config.PREFIX + "] " + args.join(" ") + " v" + require('./../../package.json').version);

        message.lineReplyNoMention({embed: {
            description: "Đã đặt biệt danh của bot thành **" + args.join(" ") + "**.",
            color: client.config.DEF_COLOR
        }});
    }
}