// 用以取得 <header> 與 <section> 元素的參考，並將之儲存於變數之中
var header = document.querySelector('header');
var section = document.querySelector('section');

//儲存要在變數中檢索的 JSON 遠端檔案
var requestURL = 'https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json';

//儲存要在變數中檢索的 JSON 本地檔案
// var requestURL = 'localsuperheroes.json';

//為了建立請求，我們必須透過 new 關鍵字，先從 XMLHttpRequest 建構子建立新的請求物件
var request = new XMLHttpRequest();

//用 open() 函式開啟新的請求
//GET 檢索資料
//URL 提供請求目的地
request.open('GET', requestURL);

//為JSON設定responseType，告知伺服器應回傳 JSON 物件
request.responseType = 'json';

//以 send() 函式傳送請求
request.send();

//當於請求物件上觸發載入事件時，執行以下功能
request.onload = function () {

  //將所獲得的響應 (可到 response 屬性中找到) 儲存到 superHeroes 變數之中
  var superHeroes = request.response;

  //將正確資料填入 <header>
  populateHeader(superHeroes);

  // 為團隊中的各個英文建立資訊卡，再插入至 <section> 內
  showHeroes(superHeroes);
}

function populateHeader(jsonObj) {
  //建立 <h1> 元素
  var myH1 = document.createElement('h1');

  //將其 textContent 指定為 JSON 的 squadName 屬性
  myH1.textContent = jsonObj['squadName'];

  //透過 appendChild() 將之附加到標頭
  header.appendChild(myH1);

  //建立 <p> 元素
  var myPara = document.createElement('p');

  //建立、設定其文字內容，並串接為1組字串
  myPara.textContent = 'Hometown: ' + jsonObj['homeTown'] + ' // Formed: ' + jsonObj['formed'];

  //附加到標頭
  header.appendChild(myPara);
}

function showHeroes(jsonObj) {

  // 把 JSON 的 members 屬性儲存到新的變數中
  var heroes = jsonObj['members'];

  // 循環陣列中的各個物件
  for (i = 0; i < heroes.length; i++) {

    // 建立各個新的元素
    var myArticle = document.createElement('article');
    var myH2 = document.createElement('h2');
    var myPara1 = document.createElement('p');
    var myPara2 = document.createElement('p');
    var myPara3 = document.createElement('p');
    var myList = document.createElement('ul');

    myH2.textContent = heroes[i].name;
    myPara1.textContent = 'Secret identity: ' + heroes[i].secretIdentity;
    myPara2.textContent = 'Age: ' + heroes[i].age;
    myPara3.textContent = 'Superpowers:';

    var superPowers = heroes[i].powers;

    //逐一巡過目前英雄的超能力
    for (j = 0; j < superPowers.length; j++) {

      // 建立新的 <li> 元素
      var listItem = document.createElement('li');

      // 把超能力放進該元素之中
      listItem.textContent = superPowers[j];

      // 把 listItem 放入 <ul> 元素之內 (myList)。
      myList.appendChild(listItem);
    }

    // 在 <article> (myArticle) 之內附加 <h2>、<p>、<ul>
    myArticle.appendChild(myH2);
    myArticle.appendChild(myPara1);
    myArticle.appendChild(myPara2);
    myArticle.appendChild(myPara3);
    myArticle.appendChild(myList);

    // 把 <article> 附加於 <section> 之內
    section.appendChild(myArticle);
  }
}