function Binary() {
    return {
        match: function (_str) {
            return true
        },
        eq: function (_str) {
            return {
                title: parseInt(_str).toString(2),
                description: 'Binary',
                logo: ''
            }
        }
    }
}

function Octal() {
    return {
        match: function (_str) {
            return true
        },
        eq: function (_str) {
            return {
                title: '0' + parseInt(_str).toString(8),
                description: 'Octal',
                logo: ''
            }
        }
    }
}

// title: err.msg,
//                     description: err.code,
//                     icon: icon(config.api), // 图标
//                     url: ''

function Hex() {
    return {
        match: function (_str) {
            return true
        },
        eq: function (_str) {
            return {
                title: '0x' + parseInt(_str).toString(16),
                description: 'Hex',
                logo: ''
            }
        }
    }
}

function Timestamp() {
    return {
        match: function (_str) {
            return true
        },
        eq: function (_str) {
            var a = new Date(_str * 1000);
            var year = a.getFullYear();
            var month = a.getMonth();
            var date = a.getDate();
            var hour = a.getHours();
            var min = a.getMinutes();
            var sec = a.getSeconds();
            var timezone = -(a.getTimezoneOffset() / 60)
            timezone = (timezone >= 0 ? ('+' + timezone) : ('-' + timezone))+':00:00'
            var time = year + '-' + month + '-' + date + ' ' + hour + ':' + min + ':' + sec + ' ' + timezone;
            return {
                title: time,
                description: 'time stamp',
                logo: ''
            }
        }
    }
}





function mods() {
    return [
        Binary(),
        Octal(),
        Hex(),
        Timestamp()
    ]
}


module.exports = {
    mods
}