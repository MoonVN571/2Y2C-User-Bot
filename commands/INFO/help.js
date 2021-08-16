    var { readdirSync, readdir } = require('fs');

    module.exports = {
        name: "help",
        description: "Xem lệnh hướng dẫn",
        delay: 7,

        execute(client, message, args) {
            if(args[0]) {
                readdirSync('./commands/').forEach(dir => {            
                    readdir(`./commands/${dir}`, (err, files) => {
                        if(err) throw err;
                        
                        if(files.find(f => f.split('.')[0] == args[0])) {
                            const cmd = require(`../../commands/${dir}/${args[0]}`);

                            if(cmd.aliases) {
                                message.lineReplyNoMention({embed: {
                                    title: "Lệnh: " + cmd.name,
                                    description: "Công dụng: ``" + cmd.description + "``" + "\n\n"
                                    + "Lệnh nhanh: ``" + cmd.aliases.join(", ") + "``",
                                    color: client.config.DEF_COLOR  
                                }}).then(msg => msg.delete({timeout: 60000}));
                            } else {
                                message.lineReplyNoMention({embed: {
                                    title: cmd.name,
                                    description: "Công dụng: ``" + cmd.description + "``",
                                    color: client.config.DEF_COLOR  
                                }}).then(msg => msg.delete({timeout: 60000}));
                            }
                        }
                    });
                });
                return;
            }

            /*
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
            })*/

            let commandsList = [];
            
            readdirSync('./commands/').forEach(dir => {
                const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith('.js'));
        
                commands.forEach((file) => {
                    const pull = require(`../../commands/${dir}/${file}`);

                    commandsList.push(pull.name);
                });
            });

            message.lineReplyNoMention({embed: {
                description: "Gõ " + client.config.PREFIX +'help <lệnh> để xem thông tin lệnh',
                fields: [
                    {
                        name: "Các lệnh bot",
                        value: commandsList.join(", "),
                        inline: false,
                    }
                ],
                color: client.config.DEF_COLOR
            }}).then(msg => msg.delete({timeout: 60000}));
        }
    }