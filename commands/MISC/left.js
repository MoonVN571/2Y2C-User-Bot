module.exports = {
    name: "left",
    aliases: ['leave', 'quit'],
    description: "Thoát khỏi phòng",

    async execute(client, message, args) {
        const voiceChannel = message.member.voice.channel;
        
        voiceChannel.leave();
    }
}