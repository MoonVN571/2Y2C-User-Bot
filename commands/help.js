var { RichEmbed } = require('discord.js');

module.exports = {
    name: "help",
    aliases: [''],

    async execute(client, message, args) {
        var prefix = "!";

        var embed = new RichEmbed()
                        .setTitle("Moon 2Y2C")
                        .setDescription(
                        "\n[Moon Bot Discord](https://discord.gg/yrNvvkqp6w)\n\n" +
                        "**Comamnds:**" +
                        "\n!help - ``Xem các lệnh bot``\n" +
                            prefix + 'kd - ``Xem chỉ số K/D.\n``'
                            + prefix + 'joindate - ``Xem ngày người chơi lần đầu tham gia server.`` \n'
                            + prefix + 'playtime - ``Xem thời người chơi đã chơi.`` \n'
                            + prefix + 'seen - ``Xem lần hoạt động gần nhất của người chơi.``\n'
                            + prefix + 'playerlist - ``Xem người chơi đang online.``\n'
                            + prefix + 'deaths - ``Xem các lần chết gần đây.``\n'
                            + prefix + 'kills - ``Xem các lần giết người gần đây.``\n'
                            + prefix + 'messages - ``Xem các tin nhắn gần đây.``\n'
                            + prefix + 'firstwords - ``Xem tin nhắn đã gửi đầu tiên.``\n'
                            + prefix + 'lastwords - ``Xem tin nhắn đã gửi cuối cùng.``\n'
                            + prefix + 'firstdeaths - ``Xem lần chết đầu tiên.``\n'
                            + prefix + 'lastdeaths - ``Xem số lần chết gần nhất.``\n'
                            + prefix + 'firstkills - ``Xem tin nhắn giết người đầu tiên.``\n'
                            + prefix + 'lastkills - ``Xem tin nhắn giết người gần đây.``\n'
                            + prefix + '2bstats - ``Xem K/D người chơi 2b2t.``\n'
                            + prefix + '2bseen - ``Xem lần cuối hoạt động người chơi 2b2t.\n``'
                            + prefix + '2blastkills - ``Xem lần giết gần nhất người chơi 2b2t.\n``'
                            + prefix + '2blastdeaths - ``Xem lần cuối chết gần nhất người chơi 2b2t.\n``'
                            + prefix + '2status - ``Xem trạng thái 2b2t.\n``'
                            + prefix + "avatar - ``Xem avatar``.\n"
                            + prefix + "sudo - ``Cho bot chat nội dung yêu cầu. (dev)``"
                        )
                        .setColor('0x2EA711')
                        .setTimestamp()
                        .setFooter("Moon 2Y2C");

        message.channel.send(embed).then(msg => msg.delete(60000))
    }
}