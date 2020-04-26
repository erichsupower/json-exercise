(request = () => {
    const authorization = 'CWB-E3A1078B-3C53-44E9-BF80-E28DCFBB65FB';

    // var getLocationName = document.querySelector('#locationName').value;
    // var locationName = getLocationName ? getLocationName : '臺北市';

    var requestURL;

    requestURL = 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=' + authorization;

    var request = new XMLHttpRequest();
    request.open('get', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function () {
        var dataCWB = request.response;
        saveData(dataCWB);
        setSelectItem(dataCWB);
    }

})();

// 每3秒執行 request()
// var intervalID = setInterval(request, 3000);

// 儲存 API 資料至 localStorage
saveData = (dataCWB) => {
    var localDataCWB = JSON.stringify(dataCWB);
    localStorage.setItem("dataCWB", localDataCWB);
}

// 讀取 localStorage 資料，並轉成 json 格式
getData = () => {
    var localData = JSON.parse(localStorage.getItem("dataCWB"));
    return localData;
}

// 設定下拉選單的區域內容
setSelectItem = (num) => {
    var dataJSON = getData();
    var locationItem = dataJSON.records.location;
    
    var selectElement = document.querySelector('#locationName');

    // 從#locationName元素中移除所有子元素
    while (selectElement.firstChild) {
        selectElement.removeChild(selectElement.firstChild);
    }

    for (let i = 0; i < locationItem.length; i++) {
        const optionElement = document.createElement('option');
        optionElement.textContent = locationItem[i].locationName;
        selectElement.appendChild(optionElement);
    }   
}

setLocationNum = (dataJSON) => {
    var localtionMenu = [];

    for (let i = 0; i < dataJSON.records.location.length; i++) {

        const element = dataJSON.records.location[i].locationName;
        localtionMenu.push(element);
    }

    var getLocationName = document.querySelector('#locationName').value;
    var menuNum = localtionMenu.indexOf(getLocationName);

    //未選擇地區時的預設值(臺北市)
    if (menuNum < 0) {
        menuNum = 5;
    }

    return menuNum;
}

showTitle = (dataJSON, num) => {
    var title = document.querySelector('.title');
    title.textContent = dataJSON.records.location[num].locationName;
}

showWeather = (dataJSON, num) => {

    // Wx 天氣現象; MaxT 最高溫度; MinT 最低溫度; CI 舒適度; PoP 降雨機率
    var records = dataJSON.records;
    var location = records.location[num];

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

update = () => {
    var dataJSON = getData();
    var num = setLocationNum(dataJSON);

    showTitle(dataJSON, num);
    showWeather(dataJSON, num);
    setSelectItem(num);
}

var send = document.querySelector('#send');
send.addEventListener('click', update);

update();