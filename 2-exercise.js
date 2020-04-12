var header = document.querySelector('header');
var section = document.querySelector('section');

var requestURL = 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-E3A1078B-3C53-44E9-BF80-E28DCFBB65FB&locationName=%E6%96%B0%E5%8C%97%E5%B8%82';

var request = new XMLHttpRequest();
request.open('get', requestURL);
request.responseType = 'json';
request.send();

request.onload = function () {
    var dataCWB = request.response;
    populateHeader(dataCWB);
    showMeteorological(dataCWB);
}

function populateHeader(jsonObj) {
    var myH1 = document.createElement('h1');
    myH1.textContent = jsonObj['records']['datasetDescription'];
    header.appendChild(myH1);
}

function showMeteorological(jsonObj) {
    var weather = jsonObj['records']['location'][0];
    var locationNameString = weather['locationName'];

    var elementWx = weather['weatherElement'][0];
    var elementPoP = weather['weatherElement'][1];
    var elementMinT = weather['weatherElement'][2];
    var elementCI = weather['weatherElement'][3];
    var elementMaxT = weather['weatherElement'][4];

    var myArticle = document.createElement('article');
    var myH2 = document.createElement('h2');

    myH2.textContent = locationNameString;
    myArticle.appendChild(myH2);

    for (let i = 0; i < elementWx.time.length; i++) {

        // 創建 html 元素
        var cardBody = document.createElement('div');
        var card = document.createElement('div');
        var time1 = document.createElement('time');
        var time2 = document.createElement('time');
        var p1 = document.createElement('p');
        var span1 = document.createElement('span');

        // 元素中加入資料內容
        time1.textContent = elementWx.time[i].startTime;
        time2.textContent = elementWx.time[i].endTime;
        p1.textContent = elementWx.time[i].parameter.parameterName;
        span1.textContent = elementWx.time[i].parameter.parameterValue;

        //將元素加至網頁
        cardBody.appendChild(time1);
        cardBody.appendChild(time2);
        cardBody.appendChild(p1);
        cardBody.appendChild(span1);

        card.appendChild(cardBody);
        myArticle.appendChild(card);

        //加入 class name
        cardBody.classList.add("card-body");
        card.classList.add("card");

    }

    for (let i = 0; i < elementPoP.time.length; i++) {

        // 創建 html 元素
        var cardBody = document.createElement('div');
        var card = document.createElement('div');
        var time1 = document.createElement('time');
        var time2 = document.createElement('time');
        var p1 = document.createElement('p');
        var span1 = document.createElement('span');

        // 元素中加入資料內容
        time1.textContent = elementPoP.time[i].startTime;
        time2.textContent = elementPoP.time[i].endTime;
        p1.textContent = elementPoP.time[i].parameter.parameterName;
        span1.textContent = elementPoP.time[i].parameter.parameterValue;

        //將元素加至網頁
        cardBody.appendChild(time1);
        cardBody.appendChild(time2);
        cardBody.appendChild(p1);
        cardBody.appendChild(span1);

        card.appendChild(cardBody);
        myArticle.appendChild(card);

        //加入 class name
        cardBody.classList.add("card-body");
        card.classList.add("card");

    }

    section.appendChild(myArticle);
}