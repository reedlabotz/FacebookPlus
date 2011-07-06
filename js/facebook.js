$(".a-b-la-A").bind("DOMSubtreeModified", function() {
   //check if the facebook link is there
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
      
      //hide the loading bok
      $(".qd").html("");
      $(".ed.wl").hide();
      
      
      if(data.errorSummary == "Not Logged In"){
         //if not logged in show a message
         $(".a-b-f-i-oa").html("<div class=\"a-b-f-i a-f-i\">You are not logged in to facebook. Please visit <a href=\"http://facebook.com/\">Facebook</a> and log in.</div>");
      }else{
         //if logged in display the content
         $(".a-b-f-i-oa").html(data.payload);
         
         //make the storys fit the theme a little
         //Turn li into div
         $(".genericStreamStory").each(function(){
            $(this).replaceWith("<div class=\"a-b-f-i a-f-i\">" + $(this).html() + "</div>")
         });
         
         //Status updates
         $(".uiStreamMessage").each(function(){
            $(this).replaceWith("<span class=\"w0wKhb\">" + $(this).html() + "</span>")
         });
         
         //Main profile pic
         $(".uiProfilePhotoLarge").removeClass().addClass("a-f-i-q a-b-f-i-q");
         
         //self-explanatory
         $(".storyContent").removeClass().addClass("a-b-f-i-p a-f-i-p");
         
         // ??? invisible!
         $("uiSelector.mlm.hideSelector.uiSelectorRight").remove();
         
         // everything except main profile pic
         $("UIImageBlock").removeClass().addClass("a-f-i-p-r");
         
         //remove the like button
         $(".like_link").hide();     
         
         //remove the comment link
         $(".comment_link").hide();
         
         //remove the whole comment area
         $(".uiUfiAddComment").hide();
         $(".commentArea").hide();
         $(".commentActions").hide();
      }
   });
}


