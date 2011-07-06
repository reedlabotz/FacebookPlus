//$(".a-la-h-ga:last").after("Facebook");


chrome.extension.sendRequest({'action' : 'getFacebook'},function(data){
   console.log("We have facebook in google+");
   var dataSplit = data.split("for (;;);");
   var goodData = dataSplit[1];
   var jsonData = $.parseJSON(goodData);
   //$("#content").html(jsonData.payload);
});

$(".a-b-la-A").bind("DOMSubtreeModified", function() {
   console.log("Changed");
   if( $("#fb-stream").length == 0) {
	  $(".d-h.a-b-h-Jb.a-la-h.a-b-la-nK.a-la-hA").before(
         "<div id=\"fb-stream\" class=\"a-la-h-ga\"><a class=\"d-h a-b-h-Jb a-la-h a-la-Rb-h a-b-la-Rb-h\">Facebook</a></div>"
	  );
	}
});
