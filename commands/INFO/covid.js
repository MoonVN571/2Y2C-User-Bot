const covid19 = require('covid19-stats');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "covid",
    description: "Xem tình hình dịch bệnh Covid-19.",
    aliases: ['covid19', 'covid-19', 'coronavirus', 'corona'],
    delay: 10,

    async execute(client, message, args) {
        if(!args[0]) checkCountry("Vietnam", "Việt Nam");

        if(args[0] == "total" || args[0] == "all") return checkWorld(); 
        if(args[0]) checkCountry(args[0], message.content.split(message.content.split(" ")[0] + " ")[1].toUpperCase());

        async function checkWorld() {
            let data = await covid19.getCountry("WORLD")

            var totalCase = data.totalCases;
            var totalCaseDeaths = data.totalDeaths;
            var newCase = data.newCases;
            var newDeaths = data.newDeaths;

            let embed = new MessageEmbed()
                    .setTitle("COVID-19 - Thế giới")
                    .addField('**Tổng số ca**', Intl.NumberFormat().format(totalCase), true)
                    .addField('**Số ca hôm nay**', Intl.NumberFormat().format(newCase), true)
                    .addField('**Tổng ca tử vong**', Intl.NumberFormat().format(totalCaseDeaths), false)
                    .addField('**Ca tử vong mới**', Intl.NumberFormat().format(newDeaths), false)
                    .setColor(0x2EA711)
                    .setImage('https://cdn.discordapp.com/attachments/795842485133246514/877082037268414544/covid-19.png');


            message.lineReplyNoMention(embed).then(msg => msg.delete({timeout: 60000}));
        }

        async function checkCountry(country, show) {
            let data = await covid19.getCountry(country);

            if(!data) return message.channel.send({embed: {
                description: "Không tìm thấy nước bạn tìm kiếm.",
                color: client.config.DEF_COLOR
            }}).then(msg => msg.delete({timeout: 60000}));

            if(country == "WORLD") return checkWorld();

            var totalCase = data.totalCases;
            var totalCaseDeaths = data.totalDeaths;
            var newCase = data.newCases;
            var newDeaths = data.newDeaths;


            let embed = new MessageEmbed()
                        .setTitle("COVID-19 - " + show)
                        .addField('**Tổng số ca**', Intl.NumberFormat().format(totalCase) , true)
                        .addField('**Tổng ca tử vong**', Intl.NumberFormat().format(totalCaseDeaths), true)
                        .addField('**Ca mắc mới**', Intl.NumberFormat().format(newCase), false)
                        .addField('**Ca tử vong mới**', Intl.NumberFormat().format(newDeaths), true)
                        .addField('\u200B', "Xem thông tin về Covid chi tiết ở Việt Nam: " + client.prefix + "covid-v2\nBạn có thể gõ ``" + client.prefix + "covid <NƯỚC>`` để xem nước khác", false)
                        .setColor(0x2EA711)
                        .setImage('https://cdn.discordapp.com/attachments/795842485133246514/877082406312620072/covid_banner.png');

            message.lineReplyNoMention(embed).then(msg => msg.delete({timeout: 60000}));
        }
    }
}