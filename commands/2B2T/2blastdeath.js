var request = require('request');

var a = require('../../api');
var api = new a();

module.exports = {
    name: "2blastdeath",
    description: "Xem lần chết gần nhất",
    delay: 10,
    
    async execute(client, message, args) {
        if (!args[0]) return message.channel.send(client.inputUsername).then(msg => msg.delete({timeout: 60000}));

        request("https://api.2b2t.dev/stats?lastdeath=" + args[0], function (error, response, body) {
            var data = JSON.parse(body)[0];
            if (!data) return message.channel.send(client.userNotFound).then(msg => msg.delete({timeout: 60000}));

            var dataa = data.date + " " + data.time;

            var t = dataa.split(" ")[1];
        
            var date = dataa.replace('/', '-').replace(".", "-").replace('.2', '-202').replace("/2", '-202')
        
            var day = date.split("-")[2].split(" ")[0];
            var month = date.split("-")[1];
            var year = date.split("-")[0];
        
        
            var datee = year + '-' + month + '-' + day + "T" + t.replace(" ", "T") + ".121Z";
            
            var tick = new Date(datee).getTime();

            message.lineReplyNoMention({embed: {
                description: `**${api.ageCalc(tick)} trước:** + ${data.message}`,
                color: 0x2EA711
            }}).then(msg => msg.delete({timeout: 60000}));
        });
    }
}