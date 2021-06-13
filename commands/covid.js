const covid19 = require('covid19-stats');

module.exports = {
    name: "covid",
    aliases: ['covid19', 'covid-19', 'coronavirus', 'corona'],
    
    async execute(client, message, args) {
        let data = await covid19.getCountry('vietnam');

        var totalCase = data.totalCases;
        var totalCaseDeaths = data.totalDeaths;
        var newCase = data.newCases;
        var newDeaths = data.newDeaths;

        message.channel.send({embed: {
            title: '| COVID-19 |',
            description: "**Việt Nam**\n\n**Số ca**: " + totalCase + "\n**Số ca mới**: " + newCase + "\n**Số ca tử vong**: " + totalCaseDeaths + "\n**Số ca tử vong mới**: " + newDeaths
            ,color: 0x2EA711
        }}).then(msg => msg.delete(60000));
    }
}