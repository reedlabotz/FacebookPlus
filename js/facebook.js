$(".d-h.a-b-h-Jb.a-la-h.a-b-la-nK.a-la-hA").before(
   "<div id=\"fb-stream\" class=\"a-la-h-ga\"><a class=\"d-h a-b-h-Jb a-la-h a-la-Rb-h a-b-la-Rb-h\">Facebook</a></div>"
);
$("#fb-stream").click(loadFacebook);

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
         //main content area marked for convenience
         $(".a-b-f-i-oa").addClass("facebook");
       
         addPosts(data);
      }   
   });
}

function addPosts(data) {
   //remove more button
    $("#more").remove();

   //if logged in display the content
   $(".a-b-f-i-oa").append(data.payload);
   
   //make the stories fit the theme a little
   // li -> div removes those pesky dots
   $(".genericStreamStory").each(function(){
      $(this).replaceWith("<div class=\"a-b-f-i a-f-i\">" + $(this).html() + "</div>")
   });
   
   //Move name and timestamp into google+ style header
   $(".mainWrapper").each(function(){
      if ($(this).children(".google-header").length != 0) return;
      var name = $(this).find(".uiStreamMessage .actorDescription a");
      if (name.length == 0) { //There are two different types on names in fb
         name = $(this).find("a.passiveName");
      }
      
      var time = $(this).find(".uiStreamSource abbr.timestamp");
      
      //add permalink if supported (doesn't exist if you can't comment)
      var permalink = time.parent().attr("href");
      console.log(permalink);
      var permainkText = ""
      if (permalink) {
         //fix relative links
         if(!permalink.match(/^http/)) permalink = "http://www.facebook.com" + permalink
         permalinkText = " &nbsp;-&nbsp; <a href=\""+permalink+"\">Permalink</a>";
      } else {
         permalinkText = " "
      }
      console.log(permalinkText);
      
      $(this).prepend("<div class=\"google-header\"></div>");
      $(this).children(".google-header").append(
      "<span class=\"a-f-i-go\"><a href=\"" + name.attr("href") +
      "\" class=\"a-b-f-wp a-f-i-Zb a-f-i-Zb-U\">" + name.html() +
      "</a></span><span class=\"a-f-i-yj a-b-f-i-Ad-Ub a-f-i-Ad-Ub\"> &nbsp;-&nbsp; " + 
      "<span title=\"" + time.attr("title") + "\">" + time.html() + "</span>" +
      permalinkText + "</span></div>");
      
      $(this).find(".uiStreamMessage .actorDescription a").hide();
      $(this).find(".uiStreamSource").hide();
      
      //Direct "view all 100 older comments" to the permalink
      $(this).find(".uiUfiViewAll a").attr("href",permalink);
   });
   
   //Sent from iphone or whatever
   $(".uiStreamFooter").hide();
   
   //The arrow denoting wall posts
   //UNTESTED (not showing up in my feed at the moment)
   $(".sp_1714d3.sx_d8efe5").css({"margin":"5px 0px","background-image":"url(http://static.ak.fbcdn.net/rsrc.php/v1/zn/r/ebNsw0vkzm3.png)"});
   
   //minor tweaks to photo album posts
   //Ideally, this would actually use the google picture layout, but I'm tired. Maybe later 
   $(".uiPhotoThumb").css({"border":"1px solid #CCC","float":"left","margin-right":"4px"});
   $(".uiPhotoThumb img.img").css({"vertical-align" : "top","margin":"3px"});
   $(".uiAttachmentTitle").css({"clear":"both","padding-top":"8px"});
   $(".uiStreamAttachments").css({"padding-top":"8px"});
   
   //Body Text
   $(".uiStreamMessage").each(function(){
      $(this).replaceWith("<span class=\"uiStreamMessage w0wKhb\">" + $(this).html() + "</span>")
   });
   
   //Main profile pic
   $(".uiProfilePhotoLarge").removeClass().addClass("a-f-i-q a-b-f-i-q");
   
   //self-explanatory
   $(".storyContent").removeClass().addClass("a-b-f-i-p a-f-i-p");
   
   // post selector
   $("uiSelector.mlm.hideSelector.uiSelectorRight").hide();
   
   // everything except main profile pic
   $("UIImageBlock").removeClass().addClass("a-f-i-p-r");
   
   //remove the like button
   $(".like_link").hide();     
   
   //remove hidden elements
   $(".ufiNub").hide(); 
   
   //make relative links for "N people liked this" into absolute paths
   $("a[title=\"See people who like this item\"]").each(function(){
      if (! $(this).attr("href").match(/^http/))
         $(this).attr("href","http://www.facebook.com" + $(this).attr("href"));
   });
   
   //list of comments
   $(".commentList").removeClass().addClass("a-b-f-i-Xb a-f-i-Xb");
   
   //comment name
   $(".uiUfiComment div.uiUfiActorBlock").addClass("a-f-i-W-Lh-z");
   
   //comment thumbnail pic
   $(".uiUfiComment img").addClass("a-f-i-q a-b-f-i-q a-f-i-W-Zb-z");
   
   //comment time stamp
   $(".uiUfiComment abbr").addClass("a-f-i-Ad");
   
   
   //remove the comment link
   $(".comment_link").hide();
   
   //remove the area for adding comments
   $(".uiUfiAddComment").remove();
   
   //remove buttons for linking other people comments
   $(".commentActions span").hide();
   
   
   $(".hidden_elem").hide();
   $(".facebook ul").css("padding","0px");
   $(".facebook ul").css("list-style","none");
   
   //Like and otehr buttons in posts
   $(".uiUfiLike").addClass("a-b-f-i-Hg-Uf a-f-i-Hg-Uf");
   $(".UIActionLinks").hide();
   
   //Comments
   $(".uiUfiComment").addClass("a-f-i-W");
   $(".uiUfiViewAll").addClass("a-f-i-W");
   
   $(".facebook").append("<div id=\"more\" class=\"a-b-f-zd-gb-A a-f-zd-gb-A\"><span role=\"button\" class=\"more d-h a-b-f-zd-gb-h a-f-zd-gb-h\">MORE</span></div>");
   $("#more").click(getPosts);
}

function getPosts() {
   $("#more .more").html("Loading...");
   $("#more").click(function(){});
   chrome.extension.sendRequest({'action' : 'getFacebook'},function(data){
      console.log("We have facebook in google+");
      
      //hide the loading bok
      $(".qd").html("");
      $(".ed.wl").hide();
       
      if(data.errorSummary == "Not Logged In"){
         //if not logged in show a message
         $(".a-b-f-i-oa").html("<div class=\"a-b-f-i a-f-i\">You are not logged in to facebook. Please visit <a href=\"http://facebook.com/\">Facebook</a> and log in.</div>");
      }else{      
         addPosts(data);
      }   
   });
}


