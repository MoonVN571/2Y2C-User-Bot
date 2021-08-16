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
                    .addField('**Ca tử vong mới**', Intl.NumberFormat().format(newDeaths), true)
                    .setColor(0x2EA711)
                    .setThumbnail('https://cdn.discordapp.com/attachments/795842485133246514/856490124871467038/COVID-19-1.png');


            message.lineReplyNoMention(embed).then(msg => msg.delete({timeout: 60000}));
        }

        async function checkCountry(country, show) {
            let data = await covid19.getCountry(country);

            if(!data) returnmessage.channel.send({embed: {
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
                        .addField('**Ca nhiễm mới**', Intl.NumberFormat().format(newCase), true)
                        .addField('**Ca tử vong trong nước**', Intl.NumberFormat().format(totalCaseDeaths), false)
                        .addField('**Ca tử vong mới**', Intl.NumberFormat().format(newDeaths), true)
                        .setColor(0x2EA711)
                        .setThumbnail('https://cdn.discordapp.com/attachments/795842485133246514/856490124871467038/COVID-19-1.png');

            message.lineReplyNoMention(embed).then(msg => msg.delete({timeout: 60000}));
        }
    }
}