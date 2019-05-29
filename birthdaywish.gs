function sendBirthdayWish()
{
  var ss = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1YeRU4UabaBcMUjA2SApQXksT-x_bXbVxHOjL-2-P16E/edit#gid=1716476145");
  var sheet = ss.getActiveSheet();
  var lastRow = ss.getLastRow();
  var templateId = '18hFJF96wET1hJHoMWOE4k8c_IwpXo5y9oL2pboMktf0';
  var current_date = new Date();
  var i=2;
  var current_date = Utilities.formatDate(new Date(), 'GMT','MMMM-dd-yyyy');
  
  for(i;i<=lastRow;i++)
  {
    var birthdayDate = Utilities.formatDate(sheet.getRange(i,3).getValue(),'GMT','MMMM-dd-yyyy');
    
    if(current_date==birthdayDate)
    {
      var name = sheet.getRange(i,4).getValue();
      var tomail = sheet.getRange(i,2).getValue();
      sendwish(name,tomail,sheet,templateId);
    }
    
  }
  
}
function sendwish(name,tomail,sheet,templateId)
{
  var newdocid = DriveApp.getFileById(templateId).makeCopy('temp').getId();
  var docopen = DocumentApp.openById(newdocid);
  var body = docopen.getBody();
  
  body.replaceText('#name#',name);
  docopen.saveAndClose();
  var url = "https://docs.google.com/feeds/download/documents/export/Export?id="+newdocid+"&exportFormat=html";
	var param = {
	method      : "get",
	headers     : {"Authorization": "Bearer " +  ScriptApp.getOAuthToken()}
	};
  var htbody = UrlFetchApp.fetch(url,param).getContentText();
  var trashed = DriveApp.getFileById(newdocid).setTrashed(true);
  MailApp.sendEmail(tomail,'HAPPY BIRTHDAY'+name,'',{htmlBody:htbody});
}
