
/**
 *            2Y2C-DiscordServer-Bot
 *  Yêu cầu giữ credit về source code.
 * 
 * 
 * https://github.com/MoonVN571/2Y2C-DiscordServer-Bot
 */
const { Client, Collection } = require("discord.js");
const config = require("./config.json");

require('discord-reply');
const client = new Client({ _tokenType: ""});

client.interaction = {}; 
const DiscordButtons = require('discord-buttons');
DiscordButtons(client);

var fs = require('fs');

client.on('ready', () => {
	console.log("Bot online!");
	client.user.setActivity(config.PREFIX + "help", { type: 'LISTENING' });
})

client.commands = new Collection();

client.on("message", message => {
    // test  
    // message.channel.send({ components: [interactiveButtons], embed: embeds[0] });
})

fs.readdirSync('./commands/').forEach(dir => {
    const commands = fs.readdirSync(`./commands/${dir}/`).filter(file => file.endsWith('.js'));

    commands.forEach((file) => {
        const pull = require(`./commands/${dir}/${file}`);

        client.commands.set(pull.name, pull);

        console.log("Loaded " + file);
    });
});

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    const event = require(`./events/${file}`);

    console.log("loaded " + file)

    if (event.once) {
        client.once(event.name, (...args) => event.execute(client, ...args));
    } else {
        client.on(event.name, (...args) => event.execute(client, ...args));
    }
}

require('dotenv').config();

client.login(process.env.token).catch((e) => { console.log(e); });
client.on("error", (e) => { console.error(e) });