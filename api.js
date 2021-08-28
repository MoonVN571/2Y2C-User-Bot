require('dotenv');

function API() {
    this.ageCalc = (time) => {
        var up = new Date(new Date().getTime() - new Date(time).getTime());
        
        let years = up.getUTCFullYear() - 1970;
        let months = up.getUTCMonth();
        let days = up.getUTCDate() - 2;
        let hours = up.getUTCHours();
        let minutes = up.getUTCMinutes();
    
        var string = "vài giây";
        if(hours == 0 && minutes > 0) string = minutes + " phút";
        if(hours > 0 && minutes == 0) string = hours   + " giờ";
    
        if(hours > 0 && minutes > 0)  string = hours   + " giờ " + minutes + " phút";
        if(hours > 0 && minutes == 0) string = hours   + " giờ";
    
        if(days > 0 && months > 0) string = months + " tháng " + days + " ngày ";
        if(days > 0 && months == 0) string = days + " ngày " + string;
        if(days == 0 && months > 0) string = months + " tháng";
        
        if(years > 0) string = years + " năm " + string;
        
        return string;
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

    this.getDate = (datetime) => {
        return this.soDep(new Date(datetime).getDate(), 2) + 
        "/" + this.soDep(new Date(datetime).getMonth() + 1, 2) + 
        "/" + new Date(datetime).getFullYear();
    }

    this.getTime = (time) => {
        return this.soDep(new Date(time).getHours(), 2) + 
        ":" + this.soDep(new Date(time).getMinutes(), 2) + 
        ":" + this.soDep(new Date(time).getSeconds(), 2);
    }

    this.getTimestamp = (datetime) => {
        return this.soDep(new Date(datetime).getDate(), 2) + 
        "/" + this.soDep(new Date(datetime).getMonth() + 1, 2) + 
        "/" + new Date(datetime).getFullYear() + 
        " " + 
        this.soDep(new Date(datetime).getHours(), 2) + 
        ":" + this.soDep(new Date(datetime).getMinutes(), 2) + 
        ":" + this.soDep(new Date(datetime).getSeconds(), 2);
    }

    this.soDep = (value, length) => {
        return `${value}`.padStart(length, 0);
    }
    
    this.random = (min, max) => {
       return Math.floor(Math.random() * (max - min) + min);
   }

    this.calculate = time => {
        var temp = time / 1000;
        var days = 0, hours = 0, minutes = 0, seconds = 0;
        days = parseInt(temp / 86400);
        hours = parseInt(((temp - days * 86400) / 3600));
        minutes = parseInt(((temp - days * 86400 - hours * 3600)) / 60);
        seconds = parseInt(temp % 60);
    
        var string = "vài giây";
        if(hours == 0 && minutes == 0 && seconds > 0) string = seconds + " giây";
        if(hours == 0 && minutes > 0 && seconds == 0) string = minutes + " phút";
        if(hours > 0 && minutes == 0 && seconds == 0) string = hours   + " giờ";
    
        if(hours > 0 && minutes > 0 && seconds == 0) string = hours   + " giờ " + minutes + " phút";
        if(hours > 0 && minutes == 0 && seconds > 0) string = hours   + " giờ " + seconds + " giây";
        if(hours > 0 && minutes > 0 && seconds > 0) string = hours   + " giờ " + minutes + " phút " + seconds + " giây";
    
        if(days > 0) string = days + " ngày " + string;
    
        return string;
    }
}

module.exports = API;
