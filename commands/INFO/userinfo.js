var { MessageEmbed } = require('discord.js')

const Api = require('./../../api');

module.exports = {
    name: "userinfo",
    description: "Xem thông tin người nào đó",
    aliases: ['ui', 'i4', 'information'],
    
    async execute(client, message, args) {
        var user = args[0];        
        var tag = message.mentions.members.first();
        
        if(isNaN(user) && !tag) user = message.author.id; 
        if(tag) user = tag.id;

        let check_name = client.users.cache.find(user => user.username.toLowerCase() == args.join(" ").toLowerCase()) || client.users.cache.find(user => user.username == args.join(" "));
        if(check_name) user = check_name.id;
        
        if(!check_name && !tag && isNaN(user) || user.length != 18) return message.lineReplyNoMention({embed: {
            description: "Bạn phải cung cấp ID hoặc tag người dùng hợp lệ.",
            color: client.config.ERR_COLOR
        }}).then(msg => msg.delete({timeout: 60000}));

        client.users.fetch(user).then(user => {
            if(!user) return message.lineReplyNoMention({embed: {
                description: "Không tìm thấy người này.",
                color: client.config.ERR_COLOR
            }}).then(msg => msg.delete({timeout: 60000}));

            const member = message.guild.member(user);
            var stt = user.presence.status ? user.presence.status : "đéo biết";

            if(stt == "idle") stt = "Đang chờ";
            if(stt == "offline") stt = "Không hoạt động (đéo biết)";
            if(stt == "online") stt = "Đang hoạt động (đéo biết)";
            if(stt == "dnd") stt = "Không làm phiền";

            let role = member ? member.roles.cache.map(roles => `${roles}`).join(', ').replace(", @everyone", "").replace("@everyone", "None") : "Không có";
            let nickname = member ? (member.user.nickname ? `${member.user.nickname}` : 'Không có') : "Không có";
            let joinServer = member ? `${new Api().getTimestamp(member.joinedAt)} \n(${new Api().ageCalc(member.joinedAt)} trước)` : "Không rõ";

            let color = user.displayHexColor ? user.displayHexColor : client.config.DEF_COLOR;

            const embed = new MessageEmbed()
                // .setColor(client.config.DEF_COLOR)
                .setColor(color)
                .setAuthor("Thông tin của " + user.username + "'s", user.avatarURL({ format: 'png', dynamic: true, size: 1024 }))
                .setDescription("ok đó")
                .setFooter("Yêu cầu bởi " + message.author.tag)
                .setThumbnail(user.avatarURL({ format: 'png', dynamic: true, size: 1024 }))
                .addField("Username:", `${user.tag}`, true)
                .addField("ID:", `${user.id}`, true)
                .addField("Biệt danh:", `${nickname}`, true)
                .addField("Trạng thái:", `${stt}`, true)
                .addField("Ngày vào server:", `${joinServer}`, true)
                .addField("Ngày tạo tài khoản:", `${new Api().getTimestamp(user.createdAt)} \n(${new Api().ageCalc(user.createdAt)} trước)`, true) 
                .addField("Roles:", role, true)

            message.lineReplyNoMention(embed).then(msg => msg.delete({timeout: 60000}));
        }).catch(err => {
            console.log(err);
            message.lineReplyNoMention("Có lỗi sảy ra, thử lại sau!").then(msg => msg.delete({timeout: 60000}));
        })
    },
};