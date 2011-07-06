$(".a-la-h-ga:last").after("Facebook");


chrome.extension.sendRequest({'action' : 'getFacebook'},function(data){
   console.log("We have facebook in google+");
   var dataSplit = data.split("for (;;);");
   var goodData = dataSplit[1];
   var jsonData = $.parseJSON(goodData);
   //$("#content").html(jsonData.payload);
});
