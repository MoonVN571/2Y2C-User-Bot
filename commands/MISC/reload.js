const { readdirSync, readdir } = require('fs');

/**
 * Source: Cart
 */

module.exports = {
    name: "reload",
    description: "Tải lại tất cả lệnh bot",
    aliases: ['rl'],
    admin: true,

    async execute(client, message, args) {        
        if(!args[0]) return message.lineReplyNoMention({embed: {
            description: "Hãy nhập 1 hoặc nhiều lệnh để reload.",
            color: client.config.ERR_COLOR
        }}).then(msg => msg.delete({timeout: 60000}));
            
        var reloaded = [];
        try {
            args.forEach(cmdReload => {
                readdirSync('./commands').forEach(dir => {
                    readdir(`./commands/${dir}`, (err, files) => {
                        if(err) throw err;
                        
                        if(files.find(f => f.split('.')[0] == cmdReload)) {
                            delete require.cache[require.resolve(`../../commands/${dir}/${cmdReload.split('.')[0]}`)]

                            const cmd = require(`../../commands/${dir}/${cmdReload.split('.')[0]}`);
                            
                            client.commands.set(cmd.name, cmd);
                        }
                    });
                });
                reloaded.push(cmdReload);
            })
        
        } catch(err) {
            console.error(err);

            return message.lineReplyNoMention({embed: {
                description: "Không thể tải lại lệnh này.",
                color: client.config.ERR_COLOR
            }}).then(msg => msg.delete({timeout: 60000}));
        }
    
        
        message.lineReplyNoMention({embed: {
            description: "Đã tải lại (các) lệnh " + reloaded.join(", ") + " thành công!",
            color: client.config.DEF_COLOR
        }}).then(msg => msg.delete({timeout: 60000}));
    }
}