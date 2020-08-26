function myFunction() {
  var dutyPersons = []
  dutyPersons = getDutyPersons()
  
  var payload = {
    "text" : "\n今日の当番ファシリテーターは" + dutyPersons[0] + "さんです\n明日は" + dutyPersons[1] + "さんです", // メッセージの本文
    "channel" : "#eng_app", // チャネルの指定
    "username" : "APP_MTG_当番", // Botの名前
  };

  postSlack(payload);
}

function getDutyPersons() {
  var url = ""; // スプレッドシートのURL
  var spreadsheet = SpreadsheetApp.openByUrl(url);
  var sheets = spreadsheet.getSheets();
  var dutyPerson
  var dutyNextPerson
  var dutyPersons = []
  
  var date = new Date()
  var day = date.getDate();
  var lastRow = sheets[0].getLastRow();
  var row = day % lastRow

  
  dutyPerson = sheets[0].getRange(row + 1, 1).getValue();
  
  if (row == 3){
    dutyNextPerson = sheets[0].getRange(1, 1).getValue();
  }else{
    dutyNextPerson = sheets[0].getRange(row + 2, 1).getValue();
  }
  dutyPersons.push(dutyPerson)
  dutyPersons.push(dutyNextPerson)
  
  return dutyPersons
}

// slackへポスト
function postSlack(payload){
  var options = {
    "method" : "POST",
    "payload" : JSON.stringify(payload)
  }

  // アクセス先
  var url = ""; // Webhook URL
  // POSTリクエスト
  var response = UrlFetchApp.fetch(url, options);
  // HTML結果を取得
  var content = response.getContentText("UTF-8");
}