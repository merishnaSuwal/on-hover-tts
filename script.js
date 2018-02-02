var tagList = ['HTML', 'HEAD', 'BODY', 'DIV', 'SECTION']; 

$(document).mousemove(function(e){
	var target = $(e.target);
    var inputtext = target.val();
    var inputmsg = new SpeechSynthesisUtterance(inputtext);
    var msgtext = target.text();
    var msg = new SpeechSynthesisUtterance(msgtext);
    var msgalt = target.attr("alt");
    var msgaltnew = new SpeechSynthesisUtterance(msgalt);
    var msglabel= target.attr('aria-label');
    var msglabelnew = new SpeechSynthesisUtterance(msglabel);

    function speaker(){
		speechSynthesis.speak(msg);
        speechSynthesis.speak(inputmsg);
        speechSynthesis.speak(msgaltnew);
        speechSynthesis.speak(msglabelnew);
		}
    stopSpeaker(){
    	speechSynthesis.cancel();
    }
	function classCheck()
    {
	    if(target.is(".speakText") ) {
	        speaker();
	        var isSpeaking=true;
	        // USE CTRL TO STOP
	       if(isSpeaking) {
	            $(document).keyup(function(e) {
	                if(e.key === "Control"){
	                stopSpeaker();
	            }
            });
        } 
    }
    if(tagList.indexOf(target.prop("tagName")) == -1){
    	target.addClass("speakText");


    }	


    	

});