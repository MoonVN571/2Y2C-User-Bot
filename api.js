require('dotenv');

function API() {
    this.ageCalc = (time) => {
        let log = (str) => {};
        log(new Date(+time).toLocaleString());
        log(new Date().toLocaleString());

        log(new Date(+time).getTime() +"old")
        log(new Date().getTime() +"now")

        var year = 0, month = 0, day = 0, hour = 0, minute = 0;

        var up = new Date(new Date().getTime() - new Date(+time).getTime());
        var d = up.toLocaleDateString();
        var t = up.toLocaleTimeString();

        log(t +"time");
        log(d +"d");

        var dstr = d.split("/")[1];
        var mstr = d.split("/")[0];
        var ystr = d.split("/")[2];

        if(dstr >= 1) dstr = dstr - 1;
        if(mstr >= 1) mstr = mstr - 1;
        if(ystr == 1970) ystr = ystr - 1970;

        if(ystr > 1970) mstr = parseInt((ystr - 1970) * 12) + (mstr + 1);

        if(d == "Invalid Date") return "không rõ";

        var hstr = parseInt(t.split(":")[0]);
        var minstr = parseInt(t.split(":")[1]);

        if(t.split(" ")[1] == "PM") hstr = hstr + 12;

        if(d.split("/")[0] == 1) hstr = hstr - 8;
        if(hstr <= 0) hstr = 0;

        log(dstr +"d");
        log(mstr +"m");
        log(hstr +"h");
        log(minstr +"min");
        var year = parseInt(mstr/12);
        var month = mstr - (year * 12);
        var day = dstr;
        var hour = hstr;
        var minute = minstr;

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

        log("API is: " + age);
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

        if(hours > 24) return "0h 0m 0s";

        if(uptime === undefined) {
            hours = 0;
            minutes = 0;
            seconds = 0;
        }
        return `${hours}h ${minutes}m ${seconds}s`; 
    }
}

module.exports = API;
