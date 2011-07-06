//$(".a-la-h-ga:last").after("Facebook");




$(".a-b-la-A").bind("DOMSubtreeModified", function() {
   console.log("Changed");
   if( $("#fb-stream").length == 0) {
	  $(".d-h.a-b-h-Jb.a-la-h.a-b-la-nK.a-la-hA").before(
         "<div id=\"fb-stream\" class=\"a-la-h-ga\"><a class=\"d-h a-b-h-Jb a-la-h a-la-Rb-h a-b-la-Rb-h\">Facebook</a></div>"
	  );
	  $("#fb-stream").click(loadFacebook);
	}
});

function loadFacebook(){
   $(".qd").html("Loading...");
   $(".ed.wl").show();
   $(".a-b-f-U-R").html("Facebook");
   $(".a-la-h-Pa").removeClass("a-la-h-Pa");
   $("#fb-stream a").addClass("a-la-Rb-h");
   $("#fb-stream a").addClass("a-la-h-Pa");
   $(".d-h.a-b-f-zd-gb-h.a-f-zd-gb-h").hide();
   $(".a-b-f-i-oa").html("");
   chrome.extension.sendRequest({'action' : 'getFacebook'},function(data){
      console.log("We have facebook in google+");
      console.log(data);
      $(".qd").html("");
      $(".ed.wl").hide();
      if(data.errorSummary == "Not Logged In"){
         $(".a-b-f-i-oa").html("<div class=\"a-b-f-i a-f-i\">You are not logged in to facebook. Please visit <a href=\"http://facebook.com/\">Facebook</a> and log in.</div>");
      }else{
         $(".a-b-f-i-oa").html(data.payload);
         
         //lets clean up the css a little bit
         $(".genericStreamStory").addClass("a-b-f-i a-f-i");
         $(".like_link").hide();
         $(".comment_link").hide();
         $(".commentArea").hide();
         $(".commentActions").hide();
      }
      
   });
}


