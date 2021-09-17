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
        let snipe = data.get(message.channel.id);

        let correctLength = args[0] ? snipe.length - parseInt(args[0]) : snipe.length - 1;

        if(!snipe || correctLength < 0 || !snipe[correctLength]) return message.lineReplyNoMention({embed: {
            description: "Không tìm thấy tin nhắn này.",
            color: client.config.ERR_COLOR
        }}).then(msg => msg.delete({timeout:60000}));

        
        let author = snipe[correctLength].author;

        let image = snipe[correctLength].image;
        let content = snipe[correctLength].content;

        let time = snipe[correctLength].time;

        let date = api.soDep(new Date(time).getDate(), 2);
        let month = api.soDep(new Date(time).getMonth() + 1, 2);
        let years = api.soDep(new Date(time).getFullYear(), 2);

        let hours = api.soDep(new Date(time).getHours(), 2);
        let minutes = api.soDep(new Date(time).getMinutes(), 2);
        let seconds = api.soDep(new Date(time).getSeconds(), 2);

        let formatTime = `${date}/${month}/${years} ${hours}:${minutes}:${seconds}`;
        
        let betterContent = content ? content : "Không có";

        if(betterContent.length > 900) betterContent = trimText(betterContent.split(""), 900).join("");
        
        
        function trimText(arr, maxLen) {
            if (arr.length > maxLen) {
                const len = arr.length - maxLen;
                arr = arr.slice(0, maxLen);
                arr.push(`\nVà còn ${len} kí tự khác`);
            }
            return arr;
        }

        message.channel.send({embed: {
            fields: [
                {
                    name: "Người gủi",
                    value: author,
                    inlnie: false
                },
                {
                    name: "Nội dung gửi",
                    value: betterContent,
                    inline: false
                },
                {
                    name: "Thời gian",
                    value: formatTime + " (" + api.ageCalc(time) + " trước)",
                    inline: false
                }
            ],
            image: {
                url: image
            },
            color: client.config.DEF_COLOR
        }}).then(msg => msg.delete({timeout: 60000})).catch(e => {
            console.log(e);
            message.lineReplyNoMention({embed: {
                fields: [
                    {
                        name: "Thông tin Lỗi",
                        value: e.toString(),
                        inline: true
                    },
                ],
                color: client.config.ERR_COLOR
            }}).then(msg => msg.delete({timeout: 60000}));
        });
    }
}