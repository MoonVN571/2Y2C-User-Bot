require('dotenv');

function API() {
    this.ageCalc = (time) => {
        var year = 0, month = 0, day = 0, hour = 0, minute = 0;

        var d = new Date(new Date().getTime() - +time).toLocaleString();
        var y =(+d.split("/")[2] - 1970);
        
        var dt = d.split(d.substr(d.length - 5))[0] + "/"+ y;

        year = parseInt(dt.split("/")[2]);
        month = parseInt(dt.split("/")[1] - 1);
        day = parseInt(dt.split("/")[0].split(" ")[1] - 1);

        hour = parseInt(dt.split(":")[0]);
        minute = parseInt(dt.split(":")[1]);
        
        log(`${year} ${month} ${day} ${hour} ${minute}`)

        var age;
        if(year > 0) {
            if(month > 0) {
                if(day > 0) {
                    age = `${year} năm ${month} tháng ${day} ngày`
                } else {
                    age = `${year} năm ${month} tháng`
                }
            } else {
                if(day > 0) {
                    age = `${year} năm ${day} ngày`
                } else {
                    age = `${year} năm`
                }
            }
        } else { // year < 0
            if(month > 0) {
                if(day > 0) {
                    age = `${month} tháng ${day} ngày`
                } else {
                    age = `${month} tháng`
                }
            } else { // month < 0
                if(day > 0) {
                    if(hour > 0) {
                        age = `${day} ngày ${hour} giờ`
                        if(minute > 0) {
                            age = `${day} ngày ${hour} giờ ${minute} phút`
                        } else {
                            age = `${day} ngày ${hour} giờ`
                        }
                    } else { // hour < 0
                        if(hour > 0) {
                            if(minute > 0) {
                                age = `${day} ngày ${hour} giờ ${minute} phút`
                            } else {
                                age = `${day} ngày ${hour} giờ`
                            }
                        } else { // hour < 0
                            if(minute > 0) {
                                age = `${day} ngày ${minute} phút`
                            } else {
                                age = `${day} ngày`
                            }
                        }
                    }
                } else { // day < 0
                    if(hour > 0) {
                        if(minute > 0) {
                            age = `${hour} giờ ${minute} phút`
                        } else {
                            age = `${hour} giờ`
                        }
                    } else { // hour < 0
                        if(minute > 0) {
                            age = `${minute} phút`
                        } else {
                            age = `vài giây`
                        }
                    }
                }
            }
        }
        return age;
    }

    this.playtimeCalc = (time) => {
        var correct = time;
        var temp = correct / 1000;
        var day = 0, hour = 0, minutes = 0;
            day = parseInt(temp / 86400)
            hour = parseInt(((temp - day * 86400) / 3600))
            minutes = parseInt(((temp - day * 86400 - hour * 3600)) / 60)
            var string;
            if( day == 0 ) {
                if(minutes > 0 && hour > 0 ) {
                    string = hour + " giờ " + minutes + " phút";		
                }
                if(minutes == 0 && hour > 0) {
                    string = hour + " giờ";
                }
                if(minutes > 0 && hour == 0) {
                    string = minutes + " phút";
                }
            } else {
                if(minutes > 0 && hour > 0 ) {
                    string = day + " ngày " + hour + " giờ " + minutes + " phút";		
                }
                if(minutes == 0 && hour > 0) {
                    string = day + " ngày " + hour + " giờ";
                }
                if(minutes > 0 && hour == 0) {
                    string = day + " ngày " + minutes + " phút";
                }
            }
        return string;
    }

    this.playtimeCalcE = (time) => {
        var correct = time;
        var temp = correct / 1000;
        var day = 0, hour = 0, minutes = 0;
            day = parseInt(temp / 86400)
            hour = parseInt(((temp - day * 86400) / 3600))
            minutes = parseInt(((temp - day * 86400 - hour * 3600)) / 60)
            var string;
            if( day == 0 ) {
                if(minutes > 0 && hour > 0 ) {
                    string = hour + " hours " + minutes + " minutes";		
                }
                if(minutes == 0 && hour > 0) {
                    string = hour + " hours";
                }
                if(minutes > 0 && hour == 0) {
                    string = minutes + " minutes";
                }
            } else {
                if(minutes > 0 && hour > 0 ) {
                    string = day + " days " + hour + " hours " + minutes + " minutes";		
                }
                if(minutes == 0 && hour > 0) {
                    string = day + " days " + hour + " hours";
                }
                if(minutes > 0 && hour == 0) {
                    string = day + " days " + minutes + " minutes";
                }
            }
        return string;
    }

    var Scriptdb = require('script.db')
    this.uptimeCalc = () => {
        const u = new Scriptdb(`${process.env.disk}/data.json`);
        let uptime = u.get('uptime');

        var d = new Date();
        var timenow = d.getTime();

        var ticks = timenow - uptime;
        var temp = ticks / 1000;
        var day = hours = 0, minutes = 0, seconds = 0;
        hours = parseInt(((temp - day * 86400) / 3600))
        minutes = parseInt(((temp - day * 86400 - hours * 3600)) / 60)
        seconds = parseInt(temp % 60)
        if(uptime === undefined) {
            hours = 0;
            minutes = 0;
            seconds = 0;
        }
        return `${hours}h ${minutes}m ${seconds}s`; 
    }
}

module.exports = API;
