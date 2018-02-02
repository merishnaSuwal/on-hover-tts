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

    if(tagList.indexOf(target.prop("tagName")) == -1){
    	

});