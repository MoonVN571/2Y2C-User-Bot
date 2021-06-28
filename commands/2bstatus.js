var newAPI = require('../api.js');
var api = new newAPI();

var { RichEmbed } = require('discord.js');
var request = require('request');

var aop = require('../api');
var api = new aop();

module.exports = {
    name: "2bstatus",
    aliases: ['2btab', '2bstatus', '2bstt'],

    async execute(client, message, args) {

        request("https://api.2b2t.dev/status", function (error, response, body) {
            var data = JSON.parse(body)[0];
        
            var tps = data[0];
            var player = data[1];
            var ping = data[2];
            var uptime = data[3];

            request('https://api.2b2t.dev/prioq', function (error, response, body) {
                let datap = JSON.parse(body)[1];
                let datat = JSON.parse(body)[3];
                let datalc = JSON.parse(body)[0];

                if(error) datap = -1;
                request('https://2b2t.io/api/queue?last=true', function (error, response, body) {
                    let dataq = JSON.parse(body)[0][1];
                    if(error) dataq = -1;

                    var embed = new RichEmbed()
                            .setAuthor('2b2t servers')
                            .addField('Server Uptime',uptime, true)
                            .addField('TPS', tps, true)
                            .addField('Players', player + " players", true)
                            .addField('Hàng chờ', dataq, true)
                            .addField('Ưu tiên', datap, true)
                            .addField('Ước tính ưu tiên', +datat + " (" + api.ageCalc(datalc) +" trước)", true)
                            .setFooter("API by LoLRiTTeR Bot", 'https://images-ext-2.discordapp.net/external/OWsrCus2cCb9txmasSQQ8UqxrkbIxM2f1VotLB8aX14/https/cdn.discordapp.com/avatars/521791765989031957/6e34a1a33d255339aa45c731637a51f8.png')
                            .setColor(0x000DFF)
                            .setTimestamp();

                    message.channel.send(embed).then(msg => msg.delete(120000));
                });
            });
        });
    }
}