const re_Octal = /^0[0-7]{1,}$/
const re_Decimal = /^[1-9]+[0-9]{1,}$/
const re_Binary = /^[0-1]{1,}$/
const re_Hex = /^0x[0-9a-z]{1,}$/i
const re_Unit = /^[0-9. ]{1,}[斤|潘|东]$/i
const re_Number = /[0-9.]/

function Unit(){
    return {
        name: 'unit',
        match: function (_str) {
            return re_Unit.test(_str)
        },
        eq: function (_str) {
            let unit = _str.replace(re_Number, '').trim()
            switch(unit){
                case '斤':{
                    return [
                        {
                            title: _str.replace(unit,'').trim()*500 +'g',
                            description: '1斤 = 500g',
                            logo: ''
                        }
                    ]
                }
                case '潘':{
                    return [
                        {
                            title: _str.replace(unit,'').trim()*1000 +' 平方米',
                            description: '1潘 = 1000 平方米',
                            logo: ''
                        }
                    ]
                }
                case '东':{
                    return [
                        {
                            title: _str.replace(unit,'').trim()*2 +'分钟',
                            description: '1东 = 2分钟',
                            logo: ''
                        }
                    ]
                }
                default:{
                    return []
                }
            }
        }
    }    
}

function Binary() {
    return {
        name: 'binary',
        match: function (_str) {
            return re_Binary.test(_str)
        },
        eq: function (_str) {
            return [
                {
                    title: parseInt(_str).toString(8),
                    description: 'Binary -> Octal',
                    logo: ''
                },
                {
                    title: parseInt(_str).toString(10),
                    description: 'Binary -> Decimal',
                    logo: ''
                },
                {
                    title: parseInt(_str).toString(16),
                    description: 'Binary -> Hex',
                    logo: ''
                }
            ]
        }
    }
}

function Octal() {
    return {
        name: 'octal',
        match: function (_str) {
            return re_Octal.test(_str)
        },
        eq: function (_str) {
            return [
                {
                    title: parseInt(_str, 8).toString(2),
                    description: 'Octal -> Binary',
                    logo: ''
                },
                {
                    title: parseInt(_str, 8).toString(10),
                    description: 'Octal -> Decimal',
                    logo: ''
                },
                {
                    title: parseInt(_str, 8).toString(16),
                    description: 'Octal -> Hex',
                    logo: ''
                }
            ]
        }
    }
}

function Decimal() {
    return {
        name: 'decimal',
        match: function (_str) {
            return re_Decimal.test(_str)
        },
        eq: function (_str) {
            return [
                // convert to binary
                {
                    title: parseInt(_str).toString(2),
                    description: 'Decimal -> Binary',
                    logo: ''
                },
                // convert to Octal            
                {
                    title: '0' + parseInt(_str).toString(8),
                    description: 'Decimal -> Octal',
                    logo: ''
                },
                // convert to Hex
                {
                    title: '0x' + parseInt(_str).toString(16),
                    description: 'Decimal -> Hex',
                    logo: ''
                }
            ]
        }
    }
}


function Hex() {
    return {
        name: 'hex',
        match: function (_str) {
            return re_Hex.test(_str)
        },
        eq: function (_str) {
            return [
                // hex to bin
                {
                    title: ("00000000" + (parseInt(_str, 16)).toString(2)).substr(-8),
                    description: 'Hex -> Binary',
                    logo: ''
                },
                // hex to Octal
                {
                    title: (parseInt(_str, 16)).toString(8),
                    description: 'Hex -> Octal',
                    logo: ''
                },
                // hex to Decimal
                {
                    title: (parseInt(_str, 16)).toString(10),
                    description: 'Hex -> Decimal',
                    logo: ''
                },
            ]
        }
    }
}

function Timestamp() {
    return {
        name: 'timestamp',
        match: function (_str) {
            return _str.startsWith('16')
        },
        eq: function (_str) {
            let _type=typeof(_str)
            var a = _type==='number'?new Date(_str):new Date(_str * 1000);
            var year = a.getFullYear();
            var month = a.getMonth()+1;
            var date = a.getDate();
            var hour = a.getHours();
            var min = a.getMinutes();
            var sec = a.getSeconds();
            var timezone = -(a.getTimezoneOffset() / 60)
            timezone = (timezone >= 0 ? ('+' + timezone) : ('-' + timezone)) + ':00:00'
            var time = year + '-' + month + '-' + date + ' ' + hour + ':' + min + ':' + sec + ' ' + timezone;
            return [{
                title: time,
                description: 'time stamp',
                logo: ''
            }]
        }
    }
}


function getWeekOfYear(d) {
    // Copy date so don't modify original
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    // Get first day of year
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    // Return array of year and week number
    return weekNo;
}

function Now() {
    return {
        name: 'now',
        match: function (_str) {
            return 'now' === _str
        },
        eq: function (_str) {
            let now=new Date()
            //timestap
            let timestamp = Timestamp()
            let nowTime = new Date().getTime()
            let res=timestamp.eq(nowTime)

            //
            const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
            res.push(
                {
                    title: dayOfYear,
                    description: 'dayOfYear',
                    logo: ''
                }
            ) 
            //          
            const weekOfYear = getWeekOfYear(now);
            res.push(
                {
                    title: weekOfYear,
                    description: 'weekOfYear',
                    logo: ''
                }
            )
            //
            res.push(
                {
                    title: now.getTime(),
                    description: 'millisecond',
                    logo: ''
                }
            ) 

            return res
        }
    }
}

function mods() {
    return [
        Unit(),
        Now(),
        Binary(),
        Octal(),
        Decimal(),
        Hex(),
        Timestamp()
    ]
}

module.exports = {
    mods
}