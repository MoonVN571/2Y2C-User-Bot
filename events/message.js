const { MessageEmbed, Collection } = require('discord.js');

const config = require("../config.json");

var a = require('../api');
var api = new a();

const Database = require('simplest.db');

const timeout = new Collection();


require('dotenv');
module.exports = {
    name: "message",

    execute(client, message) {
        if(message.author.bot) return;

        if(!message.content.startsWith(config.PREFIX) || message.channel.type == "dm") return;

        console.log(`[${new Date().toLocaleString()}] Guild: ${message.guild.name} || Channel: ${message.channel.name} || Usage: ${message.author.tag} - ${message.author.id}\nMessage: ${message.content}`);

        var args = message.content.slice(config.PREFIX.length).split(/ +/);
        
        if(args[0] == "") args = args.slice(1);
        if(!args.length) return;

        const cmdName = args.shift().toLowerCase();

        const cmd = client.commands.get(cmdName)
            || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmdName));

        if(!cmd) return;

        if(cmd.disabled) return;

        client.userNotFound = new MessageEmbed()
                        .setDescription('Không tìm thấy người chơi.')
                        .setColor(0xC51515);

        client.inputUsername = new MessageEmbed()
                        .setDescription('Bạn phải nhập tên người dùng.')
                        .setColor(0xC51515);


        client.prefix = config.PREFIX;
        client.disk = process.env.disk;
        client.config = config;
        client.footer = config.FOOTER;

        message.channel.startTyping();

        let checkVote = new Database({path: process.env.disk + '/voted.json'}).get('users-' + new Date().getUTCDate() + (new Date().getUTCMonth()+1) + new Date().getUTCFullYear());

        let admins = new Database({path: "./config.json"});
        
        if(checkVote.split(" ").indexOf(message.author.id) < 0 && admins.get("ADMINS").indexOf(message.author.id) < 0) return message.lineReplyNoMention("Bạn phải vote bot để sử dụng lệnh này.\n\nVote tại: https://top.gg/bot/768448728125407242/vote").then(msg => {
            message.channel.stopTyping();
            msg.delete({timeout: 60000});
        });

        if(cmd.delay) {
            let cmdDelay = client.commands.get(cmdName);
            if(!cmdDelay) cmdDelay = client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmdName));

            if(timeout.get(`${message.author.id}.${cmdDelay.name}`) - Date.now() < 0 || !timeout.get(`${message.author.id}.${cmdDelay.name}`)) timeout.delete(`${message.author.id}.${cmdDelay.name}`); 

            let calc = api.calculate(timeout.get(`${message.author.id}${cmdDelay.name}`) - Date.now());

            if(timeout.get(`${message.author.id}${cmdDelay.name}`) && calc) return message.lineReplyNoMention({embeds: [{
                description: `Hãy chờ \`\`${calc}\`\` để tiếp tục dùng lệnh này.`,
                color: config.ERR_COLOR
            }]}).then(msg => {
                message.channel.stopTyping();
                msg.delete({timeout: 60000});
            });

            setTimeout(() => timeout.delete(`${message.author.id}.${cmdDelay.name}`), cmdDelay.delay * 1000);
            timeout.set(`${message.author.id}.${cmdDelay.name}`, Date.now() + cmdDelay.delay * 1000);
        }

        var blacklistData = new Database({path:'./blacklist.json'}).get('users');

        if(blacklistData.indexOf(message.author.id) > -1 && admins.indexOf(message.author.id) < 0) return message.lineReplyNoMention({embed: {
            description: "Bạn có trong danh sách đen nên không thể dùng bot.", color: config.ERR_COLOR
        }}).then(msg => {
            message.channel.stopTyping();
            msg.delete({timeout: 60000});
        });

        try{
            cmd.execute(client, message, args);
            message.channel.stopTyping();
        }catch(err) {
            console.log(err);
            message.channel.stopTyping();
        }
    }
}