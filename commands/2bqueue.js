const request = require('request');

module.exports = {
    name: "2bqueue",
    aliases: ['2bq', '2bque'],
    
    async execute(client, message, args) {
		request('https://api.2b2t.dev/prioq', function (error, response, body) {
			let datap = JSON.parse(body)[1];
			if(error) {
				datap = "Lỗi";
			}
			
			request('https://2b2t.io/api/queue?last=true', function (error, response, body) {
				let dataq = JSON.parse(body)[0][1];
				if(error) {
					dataq = "Lỗi";
				}

				message.channel.send("2B2T | Hàng chờ: " + dataq + " - Ưu tiên: " + datap);
			});
		});
    }
}