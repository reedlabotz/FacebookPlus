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
   //show the loading yellow box
   $(".qd").html("Loading...");
   $(".ed.wl").show();
   
   //hide the text under "Facebook" at the top of the box
   $(".a-b-f-U-R").html("Facebook");
   $(".a-b-n-A").hide();
   $(".a-b-f-no").hide();
   
   //make the current red nav item not be red
   $(".a-la-h-Pa").removeClass("a-la-h-Pa");
   
   //make the facebook nav link turn red 
   $("#fb-stream a").addClass("a-la-Rb-h");
   $("#fb-stream a").addClass("a-la-h-Pa");
   
   //get rid of that more box at the bottom
   $(".d-h.a-b-f-zd-gb-h.a-f-zd-gb-h").hide();
   
   //remove all the text from the main div
   $(".a-b-f-i-oa").html("");
   
   //get the facebook data using the background page
   chrome.extension.sendRequest({'action' : 'getFacebook'},function(data){
      console.log("We have facebook in google+");
      console.log(data);
      
      //hide the loading bok
      $(".qd").html("");
      $(".ed.wl").hide();
      
      
      if(data.errorSummary == "Not Logged In"){
         //if not logged in show a message
         $(".a-b-f-i-oa").html("<div class=\"a-b-f-i a-f-i\">You are not logged in to facebook. Please visit <a href=\"http://facebook.com/\">Facebook</a> and log in.</div>");
      }else{
         //if logged in display the content
         $(".a-b-f-i-oa").html(data.payload);
         
         /*
         
         lets clean up the css a little bit
         
         */
         //make the storys fit the theme a little
         $(".genericStreamStory").addClass("a-b-f-i a-f-i");
         
         //remove the like button
         $(".like_link").hide();
         
         //remove the comment link
         $(".comment_link").hide();
         
         //remove the whole comment area
         $(".commentArea").hide();
         $(".commentActions").hide();
      }
      
   });
}


