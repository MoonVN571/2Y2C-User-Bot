module.exports = {
    name: "join",
    description: "Tham gia phòng",
    aliases: ['connect'],

    execute(client, message, args) {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return;

        voiceChannel.join();
    }
}