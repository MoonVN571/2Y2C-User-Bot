const Discord = require("discord.js");
const client = new Discord.Client();
var fs = require('fs');

require('dotenv').config();

var config = {
	token: process.env.token,
	ip: process.env.ip,
	disk: process.env.disk
}

client.login(config.token).catch((e) => { console.log(e)})
client.on("error", (e) => { console.error(e) });
var prefix = "!";
var color = "";

client.on('ready', () => {
	console.log("Bot online!")
	client.user.setPresence({ game: { name: "!help xem lệnh" }})
})

client.commands = new Discord.Collection();

const cmds = fs.readdirSync(`./commands`).filter(file => file.endsWith('.js'));
for (const file of cmds) {
	const cmd = require(`./commands/${file}`);

	client.commands.set(cmd.name, cmd);
}

client.on("message", async message => {
	if(message.author.bot) return;
 
	if(!message.content.startsWith(prefix) || message.channel.type == "dm") return;

	const args = message.content.slice(prefix.length).split(/ +/);
    const cmdName = args.shift().toLowerCase();
	
    const cmd = client.commands.get(cmdName)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmdName));

    if(!cmd) return;
	client.ping = client.ws.ping;

	client.userNotFound = new Discord.RichEmbed()
					.setDescription('Không tìm thấy người chơi.')
					.setColor(0xC51515);
	
	client.color = color;
	client.prefix = prefix;
	client.footer = "Moon 2Y2C";

	client.config = config;

	message.channel.startTyping();

	const Scriptdb = require('script.db');
	var data = new Scriptdb('./blacklist.json').get('list');

	if(data.includes(message.author.id)) return message.reply(" bạn có trong danh sách đen!");
	
	setTimeout(() => {
		try{
			cmd.execute(client, message, args);
			message.channel.stopTyping();
		}catch(err) {
			console.log(err);
		}
	}, 1 * 1000);
});