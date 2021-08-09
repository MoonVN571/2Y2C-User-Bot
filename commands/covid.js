const covid19 = require('covid19-stats');
const { RichEmbed } = require('discord.js');

module.exports = {
    name: "covid",
    aliases: ['covid19', 'covid-19', 'coronavirus', 'corona'],
    
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

            let embed = new RichEmbed()
                    .setTitle("COVID-19 - Thế giới")
                    .addField('**Tổng số ca**', Intl.NumberFormat().format(totalCase), true)
                    .addField('**Số ca hôm nay**', Intl.NumberFormat().format(newCase), true)
                    .addField('**Tổng ca tử vong**', Intl.NumberFormat().format(totalCaseDeaths), false)
                    .addField('**Ca tử vong mới**', Intl.NumberFormat().format(newDeaths), true)
                    .setColor(0x2EA711)
                    .setThumbnail('https://cdn.discordapp.com/attachments/795842485133246514/856490124871467038/COVID-19-1.png');


            message.channel.send(embed).then(msg => msg.delete(60000));
        }

        async function checkCountry(country, show) {
            let data = await covid19.getCountry(country);

            if(!data) return message.channel.send("Không tìm thấy khu vựt này.").then(msg => msg.delete(60000));

            var totalCase = data.totalCases;
            var totalCaseDeaths = data.totalDeaths;
            var newCase = data.newCases;
            var newDeaths = data.newDeaths;


            let embed = new RichEmbed()
                        .setTitle("COVID-19 - " + show)
                        .addField('**Tổng số ca**', Intl.NumberFormat().format(totalCase) , true)
                        .addField('**Ca nhiễm mới**', Intl.NumberFormat().format(newCase), true)
                        .addField('**Ca tử vong trong nước**', Intl.NumberFormat().format(totalCaseDeaths), false)
                        .addField('**Ca tử vong mới**', Intl.NumberFormat().format(newDeaths), true)
                        .setColor(0x2EA711)
                        .setThumbnail('https://cdn.discordapp.com/attachments/795842485133246514/856490124871467038/COVID-19-1.png');

            message.channel.send(embed).then(msg => msg.delete(60000));
        }
    }
}