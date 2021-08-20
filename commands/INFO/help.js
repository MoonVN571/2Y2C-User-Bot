    var { readdirSync, readdir } = require('fs');

    module.exports = {
        name: "help",
        description: "Xem lệnh hướng dẫn",
        delay: 7,
        vote: true,

        execute(client, message, args) {
            if(args[0]) {
                readdirSync('./commands/').forEach(dir => {            
                    readdir(`./commands/${dir}`, (err, files) => {
                        if(err) throw err;
                        
                        if(files.find(f => f.split('.')[0] == args[0])) {
                            const cmd = require(`../../commands/${dir}/${args[0]}`);
                            if(cmd.disabled) return message.lineReplyNoMention({embed: {
                                    description: "Lệnh này đã bị tắt.",
                                    color: client.config.DEF_COLOR  
                                }}).then(msg => msg.delete({timeout: 60000}));

                            if(cmd.admin && admins.indexOf(message.author.id) == -1) return message.lineReplyNoMention({embed: {
                                    description: "Bạn phải là nhà phát triển để xem hướng dẫn sử dụng lệnh này.",
                                    color: client.config.DEF_COLOR  
                                }}).then(msg => msg.delete({timeout: 60000}));

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

            let commandsList = [];
            
            readdirSync('./commands/').forEach(dir => {
                const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith('.js'));
        
                commands.forEach((file) => {
                    const pull = require(`../../commands/${dir}/${file}`);

                    commandsList.push(pull.name);
                });
            });

            message.lineReplyNoMention({embed: {
                description: "Gõ " + client.prefix +'help <lệnh> để xem thông tin lệnh',
                fields: [
                    {
                        name: "Các lệnh bot [" + commandsList.length + "]",
                        value: commandsList.join(", "),
                        inline: false,
                    }
                ],
                color: client.config.DEF_COLOR
            }}).then(msg => msg.delete({timeout: 60000}));
        }
    }