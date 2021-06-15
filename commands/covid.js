const covid19 = require('covid19-stats');
const { RichEmbed } = require('discord.js');

module.exports = {
    name: "covid",
    aliases: ['covid19', 'covid-19', 'coronavirus', 'corona'],
    
    async execute(client, message, args) {
        let data = await covid19.getCountry('vietnam');

        var totalCase = data.totalCases;
        var totalCaseDeaths = data.totalDeaths;
        var newCase = data.newCases;
        var newDeaths = data.newDeaths;

        let embed = new RichEmbed()
                    .setTitle("COVID-19")
                    .addField('**Ca trong nước**', totalCase , true)
                    .addField('**Ca mới', newcase, true)
                    .addField('**Ca tử vong trong nước', totalCaseDeaths, false)
                    .addField('**Ca tử vong mới**', newDeaths)
                    .setColor(0x2EA711)

        message.channel.send(embed).then(msg => msg.delete(60000));
    }
}