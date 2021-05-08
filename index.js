const Discord = require("discord.js");
const client = new Discord.Client();
var Scriptdb = require("Script.db");
var superagent = require('superagent');

require('dotenv').config();

var config = {
	token: process.env.token,
	ip: process.env.ip,
	disk: process.env.disk
}

setTimeout(() => {
	process.exit();
}, 5 * 60 * 1000)

client.login(config.token).catch((e) => { console.log(e)})
client.on("error", (e) => { console.error(e) });
var prefix = "!";

client.on('ready', () => {
	console.log("Bot online!")
	client.user.setPresence({ game: { name: "!help xem lệnh" }})
})


client.on("message", async message => {
	if(message.author.bot|| !message.content.startsWith(prefix) || message.author == client.user || message.channel.type == "dm") return;

	if(dev && message.guild.id !== "794912016237985802") return message.channel.send("Lệnh đã bị tắt tại nhóm này.");
	
    const args = message.content.slice(prefix.length).split(/ +/);
    const cmdName = args.shift().toLowerCase();

    const cmd = client.commandss.get(cmdName)
        || client.commandss.find(cmd => cmd.aliases && cmd.aliases.includes(cmdName));

	if(cmdName == "reload") {
		if(message.author.id !== "425599739837284362")
			return message.channel.send("Bạn phải là nhà phát triển để sử dụng lệnh này.").then(msg => {
				msg.delete({ timeout: 10000 });
			});

			delete require.cache[require.resolve(`./commands/${args[0]}.js`)];

		const cmd = require(`./commands/${args[0]}`);
		client.commands.set(cmd.name, cmd);
		
		message.channel.send(`Đã tải lại command ${args[0]}`)
	}

    if(!cmd) return;
	
	client.userNotFound = new Discord.MessageEmbed()
					.setDescription('Không tìm thấy người chơi.')
					.setColor('0xC51515');
	
	client.prefix = prefix;

	client.userNotFound = "Không tìm thấy người chơi.";
	
	var user = client.users.find(user => user.id === "425599739837284362");
	client.authorID = user.username + "#" + user.discriminator;

    try{
        cmd.execute(client, message, args);
    }catch(err) {
        console.log(err);
    }
});