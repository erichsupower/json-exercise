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
    var myH1 = document.createElement('h1');
    myH1.textContent = jsonObj['squadName'];
    header.appendChild(myH1);
  
    var myPara = document.createElement('p');
    myPara.textContent = 'Hometown: ' + jsonObj['homeTown'] + ' // Formed: ' + jsonObj['formed'];
    header.appendChild(myPara);
  }

  function showHeroes(jsonObj) {
    var heroes = jsonObj['members'];
        
    for(i = 0; i < heroes.length; i++) {
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
      for(j = 0; j < superPowers.length; j++) {
        var listItem = document.createElement('li');
        listItem.textContent = superPowers[j];
        myList.appendChild(listItem);
      }
  
      myArticle.appendChild(myH2);
      myArticle.appendChild(myPara1);
      myArticle.appendChild(myPara2);
      myArticle.appendChild(myPara3);
      myArticle.appendChild(myList);
  
      section.appendChild(myArticle);
    }
  }