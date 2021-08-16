const Scriptdb = require('script.db');

const fs = require('fs');
var set = new Set();

module.exports = {
    name: "top",
    disabled: true,
    
    async execute(client, message, args) {
        if(!args[0]) return message.channel.send("Không đủ dữ liệu. " + client.prefix + "top " + "<kills/deaths/kd/playtime>");

        switch(args[0]) {
            case "kd": {
                
                var cmds = await fs.readdirSync(client.disk + '/data/kd/');
                var arr = new Array();

                cmds = cmds.toString();

                await cmds.split(",").forEach(async value => {
                    await fs.readFileSync(client.disk + '/data/kd/' + value,   async (err, data) => {
                        if(err) return;
                        let raw = JSON.parse(data);
                        let kills = raw.kills || 0;
                        let deaths = raw.deaths || 0;

                        let format = kills / deaths;

                        if(format == NaN || format == "Infinity") format = 0.00;

                        await arr.push(format.toFixed(2) * 1000 + " | " + value.split(".")[0])
                    });
                });

                await console.log(arr)

                arr.sort((a, b) => +(b.split(" | ")[0]) - +(a.split(" | ")[0]));
                if(arr.length > 10) arr = arr.slice(0, 10);

                var formated = "";
                var stats = 0;
                arr.forEach(async data => {
                    stats++;
                    formated += "[#" + stats + "] " + data.split(" | ")[1] + " : ``" + data.split(" | ")[0] + "``\n"
                });

                console.log(formated);
                message.channel.send("array: " + formated + "\n" + arr)
                break;

            }
            case "kills": {
                break;

            }
            case "deaths": {

            }
            case "playtime": {

            }
            default: {
                message.channel.send("Dữ liệu không hợp lệ. " + client.prefix + "top <kills/deaths/playtime>");
            }
                
        }
    }
}