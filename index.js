const Discord = require("discord.js");
const client = new Discord.Client();
var fs = require('fs');

require('dotenv').config();

var config = {
	token: process.env.token,
	ip: process.env.ip,
	disk: process.env.disk
}

setTimeout(() => {
	process.exit();
}, 3 * 60 * 60 * 1000);

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
 
	if(message.guild.id != "625715711481741322") return;

	if(!message.content.startsWith(prefix) || message.channel.type == "dm") return;

	// ăn ở thôi :)
	if(message.author.id == "689378259833716781" || message.author.id == "843475162085982225" || message.author.id == "725226093128187916") return;

	const args = message.content.slice(prefix.length).split(/ +/);
    const cmdName = args.shift().toLowerCase();
    const cmd = client.commands.get(cmdName)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmdName));

	if(cmdName == "reload") {
		if(message.author.id !== "425599739837284362")
			return message.channel.send("Bạn phải là nhà phát triển để sử dụng lệnh này.").then(msg => msg.delete(60000));

			delete require.cache[require.resolve(`./commands/${args[0]}.js`)];

		const cmd = require(`./commands/${args[0]}`);
		client.commands.set(cmd.name, cmd);
		
		message.channel.send(`Đã tải lại command ${args[0]}`).then(msg => msg.delete(60000));
	}

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

	setTimeout(() => {
		try{
			cmd.execute(client, message, args);
			message.channel.stopTyping();
		}catch(err) {
			console.log(err);
		}
	}, 1 * 1000)
});