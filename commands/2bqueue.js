var superagent = require('superagent');

module.exports = {
    name: "2bqueue",
    aliases: ['2bque', '2bq'],
    
    async execute(client, message, args) {
		superagent.get("https://2b2t.io/api/queue?last=true").end((err, data) => {
			let queuequeue = data.body[0][1];
			if(err) {
				queuequeue = "Lỗi";
			}
			
            superagent.get("https://api.2b2t.dev/prioq").end((err, dataq) => {
				let prio = dataq.body[1];
				if(err) {
					prio = "Lỗi";
				}

				message.channel.send("2B2T | Hàng chờ: " + queuequeue + " - Ưu tiên: " + prio);
			});
		});
    }
}