const Database = require("simplest.db");

let a = require("../../api");
let api = new a();

module.exports = {
    name: "snipe",
    description: "Xem tin nhắn đã xoá gần nhất",
    delay: 10,
    
    execute(client, message, args) {
        
        if(message.channel.id == "748529588136837191") return message.channel.send({embed: {
            description: "Kênh này đã bị tắt snipe.",
            color: client.config.ERR_COLOR
        }}).then(msg => msg.delete({timeout: 60000}));

        let data = new Database({path: "./snipe.json"});

        let sniper = data.get(message.channel.id + ".author");
        
        if(!sniper) return message.channel.send({embed: {
            description: "Không tìm thấy tin nhắn đã xoá nào trong kênh này cả.",
            color: client.config.ERR_COLOR
        }}).then(msg => msg.delete({timeout: 60000}));

        let image = data.get(message.channel.id + ".image");
        let content = data.get(message.channel.id + ".content");
        
        let time = data.get(message.channel.id + ".time");

        let date = api.soDep(new Date(time).getDate(), 2);
        let month = api.soDep(new Date(time).getMonth() + 1, 2);
        let years = api.soDep(new Date(time).getFullYear(), 2);

        let hours = api.soDep(new Date(time).getHours(), 2);
        let minutes = api.soDep(new Date(time).getMinutes(), 2);
        let seconds = api.soDep(new Date(time).getSeconds(), 2);

        let formatTime = `${date}/${month}/${years} ${hours}:${minutes}:${seconds}`;
        

        message.channel.send(image, {embed: {
            fields: [
                {
                    name: "Người gủi",
                    value: sniper,
                    inlnie: false
                },
                {
                    name: "Nội dung gửi",
                    value: content,
                    inline: false
                },
                {
                    name: "Thời gian",
                    value: formatTime + " (" + api.ageCalc(time) + " trước)",
                    inline: false
                }
            ],
            color: client.config.DEF_COLOR
        }}).then(msg => msg.delete({timeout: 60000}));

    }
}