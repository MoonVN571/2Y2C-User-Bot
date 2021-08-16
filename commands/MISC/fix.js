module.exports = {
    name: "fix",
    description: "Sửa 1 số lỗi của bot",
    delay: 10,
    
    async execute(client, message, args) {
        message.channel.stopTyping(); 
        message.lineReplyNoMention("đã ngưng typing...");
    }
}