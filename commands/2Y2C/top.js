const { Collection } = require('discord.js');
const fs = require('fs');
const API = require('../../api');

module.exports = {
    name: "top",
    description: "Xem top 10 người chơi",
    delay: 10,
    vote: true,
    
    async execute(client, message, args) {
        if(!args[0]) return message.lineReplyNoMention("Không đủ dữ liệu. " + client.prefix + "top " + "<kills/deaths/kd/playtime>");

        switch(args[0]) {
            case "kills": {
                var cmds = fs.readdirSync(client.disk + '/data/kd/');
                var arr = [];

                cmds.forEach(value => {
                     fs.readFile(client.disk + '/data/kd/' + value, (err, data) => {
                        if(err) return;
                        let raw = JSON.parse(data);
                        let kills = raw.kills || 0;

                        if(kills < 200) return;

                        arr.push(kills + " | " + value.split(".")[0]);
                    });
                });

                setTimeout(() => {
                    arr.sort((a, b) => +(b.split(" | ")[0]) - +(a.split(" | ")[0]));
                    if(arr.length > 10) arr = arr.slice(0, 10);

                    var formated = "";
                    var stats = 0;
                    arr.forEach(data => {
                        stats++;
                        formated += "[#" + stats + "] " + data.split(" | ")[1] + " : ``" + Intl.NumberFormat().format(data.split(" | ")[0]) + "``\n"
                    });

                    message.lineReplyNoMention({embed: {
                        title: "Top người chơi giết người nhiều nhất",
                        description: formated,
                        color: client.config.DEF_COLOR
                        
                    }}).then(msg => msg.delete({timeout: 60000}));
                }, 3 * 1000);
                break;

            }
            case "deaths": {
                var cmds = fs.readdirSync(client.disk + '/data/kd/');
                var arr = [];

                cmds.forEach(value => {
                    fs.readFile(client.disk + '/data/kd/' + value, (err, data) => {
                        if (err)
                            return;
                        let raw = JSON.parse(data);
                        let deaths = raw.deaths || 0;

                        if (deaths < 850)
                            return;

                        arr.push(deaths + " | " + value.split(".")[0]);
                    });
                });

                setTimeout(() => {
                    arr.sort((a, b) => +(b.split(" | ")[0]) - +(a.split(" | ")[0]));
                    if (arr.length > 10)
                        arr = arr.slice(0, 10);

                    var formated = "";
                    var stats = 0;
                    arr.forEach((data) => {
                        stats++;
                        formated += "[#" + stats + "] " + data.split(" | ")[1] + " : ``" + Intl.NumberFormat().format(data.split(" | ")[0]) + "``\n";
                    });

                    message.lineReplyNoMention({
                        embed: {
                            title: "Top người chơi chết nhiều nhất",
                            description: formated,
                            color: client.config.DEF_COLOR
                        }
                    }).then(msg => msg.delete({ timeout: 60000 }));
                }, 3 * 1000);
                break;

            }
            case "playtime": {
                var cmds = fs.readdirSync(client.disk + '/data/playtime/');
                var arr = [];

                cmds.forEach(value => {
                     fs.readFile(client.disk + '/data/playtime/' + value, (err, data) => {
                        if(err) return;
                        let raw = JSON.parse(data);
                        let format = raw.time;

                        if(format < 15 * 86400 * 1000) return;

                        arr.push(format + " | " + value.split(".")[0]);
                    });
                });

                setTimeout(() => {
                    arr.sort((a, b) => +(b.split(" | ")[0]) - +(a.split(" | ")[0]));
                    if(arr.length > 10) arr = arr.slice(0, 10);

                    var formated = "";
                    var stats = 0;
                    arr.forEach(async data => {
                        stats++;
                        formated += "[#" + stats + "] " + data.split(" | ")[1] + " : ``" + new API().playtimeCalc(data.split(" | ")[0]) + "``\n"
                    });

                    message.lineReplyNoMention({embed: {
                        title: "Top người chơi chơi game nhiều nhất",
                        description: formated,
                        color: client.config.DEF_COLOR
                        
                    }}).then(msg => msg.delete({timeout: 60000}));
                }, 3 * 1000);
                break;
            }
            default: {
                message.lineReplyNoMention("Dữ liệu 0 hợp lệ. " + client.prefix + "top " + "<kills/deaths/kd/playtime>");
            }
                
        }
    }
}