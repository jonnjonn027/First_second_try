var gmail;

function refresh(f) {
  if( (/in/.test(document.readyState)) || (undefined === Gmail)) {
    setTimeout('refresh(' + f + ')', 10);
  } else {
    f();
  }
}

var main = function() {
	gmail = new Gmail();
	var mail = localStorage.getItem("replyappJsEmail")
	if(gmail != null && (mail == null || !mail.length)){
		localStorage.setItem("replyappJsEmail", gmail.get.user_email());
	}else{
		setTimeout(function(){
			main();
		}, 5000);
	}
}

refresh(main);