var getLocationName = '臺北市';
var requestURL = '';

(request = () => {

    const authorization = 'CWB-E3A1078B-3C53-44E9-BF80-E28DCFBB65FB';

    getLocationName = document.querySelector('#locationName').value;
    requestURL = 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=' + authorization + '&locationName=' + getLocationName;

    var request = new XMLHttpRequest();
    request.open('get', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function (dataCWB) {
        var dataCWB = request.response;
        showTitle(dataCWB);
        showWeather(dataCWB);
        setTime(dataCWB);
    }

})();

showTitle = (dataCWB) => {
    var title = document.querySelector('.title');
    title.textContent = dataCWB.records.location[0].locationName;
    
}

showWeather = (dataCWB) => {

    // Wx 天氣現象; MaxT 最高溫度; MinT 最低溫度; CI 舒適度; PoP 降雨機率
    var records = dataCWB.records;
    var location = records.location[0];

    // Wx 天氣現象
    var elementWx = location.weatherElement[0].time[0];
    // 降雨機率
    var elementPoP = location.weatherElement[1].time[0];
    // MinT 最低溫度
    var elementMinT = location.weatherElement[2].time[0];
    // 舒適度
    var elementCI = location.weatherElement[3].time[0];
    // MaxT 最高溫度
    var elementMaxT = location.weatherElement[4].time[0];

    var parameterValue = elementWx.parameter.parameterValue;
    var parameterName = elementWx.parameter.parameterName;

    var icon = document.querySelector('.icon');
    var ci = document.querySelector('.ci');
    var maxT = document.querySelector('.maxT');
    var minT = document.querySelector('.minT');
    var pop = document.querySelector('.pop');
    var wx = document.querySelector('.wx');

    wx.textContent = parameterName;
    ci.textContent = elementCI.parameter.parameterName;
    maxT.textContent = elementMaxT.parameter.parameterName + '℃';
    minT.textContent = elementMinT.parameter.parameterName + '℃';
    pop.textContent = elementPoP.parameter.parameterName + '%';

    switch (parameterValue) {
        case '1':
            // 晴天
            icon.setAttribute('src', './images/weather-1.svg');
            break;
        case '2':
            // 晴時多雲
            icon.setAttribute('src', './images/weather-2.svg');
            break;
        case '3':
            // 多雲時晴
            icon.setAttribute('src', './images/weather-2.svg');
            break;
        case '4':
            // 多雲
            icon.setAttribute('src', './images/weather-13.svg');
            break;
        case '5':
            // 多雲時陰
            icon.setAttribute('src', './images/weather-13.svg');
            break;
        case '6':
            // 陰時多雲
            icon.setAttribute('src', './images/weather-13.svg');
            break;
        case '7':
            // 陰天
            icon.setAttribute('src', './images/weather-14.svg');
            break;
        case '8':
            // 多雲陣雨
            icon.setAttribute('src', './images/weather-15.svg');
            break;
        case '9':
            // 多雲時陰短暫雨
            icon.setAttribute('src', './images/weather-15.svg');
            break;
        case '10':
            // 陰時多雲短暫雨
            icon.setAttribute('src', './images/weather-15.svg');
            break;
        case '11':
            // 雨天
            icon.setAttribute('src', './images/weather-16.svg');
            break;
        default:
            // F
            icon.setAttribute('src', './images/weather-8.svg');
    }

}

setTime = (dataCWB) => {

    var time = document.querySelector('.time');
    var date = document.querySelector('.date');

    var records = dataCWB.records;
    var location = records.location[0];

    var getTimeInfo = location.weatherElement[0].time[0];

    var startTimeArray = getTimeInfo.startTime.split(' ');
    var startTimeDate = startTimeArray[0].split('-');
    var startTimeTime = startTimeArray[1].split(':');

    var endTimeArray = getTimeInfo.endTime.split(' ');
    var endTimeDate = endTimeArray[0].split('-');
    var endTimeTime = endTimeArray[1].split(':');

    date.textContent = startTimeDate[1] + '.' + startTimeDate[2] + ' ' + startTimeTime[0] + ':' + startTimeTime[1];
    date.textContent += ' - ' + endTimeDate[1] + '.' + endTimeDate[2] + ' ' + endTimeTime[0] + ':' + endTimeTime[1];
}

var btnSend = document.querySelector('#send');

btnSend.addEventListener('click', request);