var tagList = ['HTML', 'HEAD', 'BODY', 'DIV', 'SECTION']; 
var isSpeaking = false;
$(document).ready(function(){ 
    chrome.storage.sync.get({
        setState: 'enable',
        setRate: '1',
        }, function(items) {
            if (items.setState === "enable")
            {
            $(document).keydown(function(e){
                if(e.key == 'F11')
                {
                    var fullscreentext = "Full screen on";
                    var fullscreenmsg = new SpeechSynthesisUtterance(fullscreentext);
                    fullscreenmsg.rate=items.setRate;
                    speechSynthesis.speak(fullscreenmsg);   
                }
            });
            // MAIN PROGRAM
            $(document).mousemove(function (e) {
                //SELECT TARGET
                var target = $(e.target);

                //FOR INPUT FIELD
                var inputtext = target.attr("placeholder");
                if(target.prop("tagName")=="INPUT"){
                   inputtext = "Input field" + inputtext;
                }
                var inputmsg = new SpeechSynthesisUtterance(inputtext);
                inputmsg.rate=items.setRate;

                //FOR BUTTON TEXT
                var msgtext = target.text();
                if(target.prop("tagName")=="BUTTON"){
                   msgtext = "Button text" + msgtext;
                }
                if(target.prop("tagName")=="A"){
                   msgtext = "Link text" + msgtext;
                }
                var msg = new SpeechSynthesisUtterance(msgtext);
                msg.rate=items.setRate;

                //FOR ALT TEXT
                var msgalt = target.attr("alt");
                var msgaltnew = new SpeechSynthesisUtterance(msgalt);
                msgaltnew.rate=items.setRate;

                //FOR ARIA LABELS
                var msglabel= target.attr('aria-label');
                var msglabelnew = new SpeechSynthesisUtterance(msglabel);
                msglabelnew.rate=items.setRate;

                //TO SPEAK
                function speaker()
                {   
                    //$(target).css("font-size", "40px");
                    speechSynthesis.speak(msg);
                    speechSynthesis.speak(inputmsg);
                    speechSynthesis.speak(msgaltnew);
                    speechSynthesis.speak(msglabelnew);
                }
                function pauseSpeaker(){
                    target.removeClass("speakText");
                    speechSynthesis.pause();
                }
                function resumeSpeaker(){
                    target.addClass("speakText");
                    speechSynthesis.resume();
                }
                //TO STOP
                function stopSpeaker()
                {
                    target.removeClass("speakText");
                    speechSynthesis.cancel();
                }
                //TO CHECK CLASS
                function classCheck()
                {
                    if(target.is(".speakText") ) {
                        speaker();
                        var isSpeaking=true;
                        // USE CTRL TO STOP
                        if(isSpeaking) {
                            $(document).keyup(function(e) {
                                if(e.key === "Control"){
                                    pauseSpeaker();
                                    var isSpeaking = false;
                                    console.log(isSpeaking);
                                }
                                $(document).keyup(function(e) {
                                    if(!isSpeaking){
                                    
                                        if(e.key === "Shift"){
                                            resumeSpeaker();
                                            var isSpeaking = true;
                                            console.log(isSpeaking);
                                        }
                                    }
                                });
                           });
                        }
                        
                    }
                }

                if(tagList.indexOf(target.prop("tagName")) == -1){
                    target.addClass("speakText");
                    setTimeout(function(){
                        $(target).mouseleave(function(){
                            stopSpeaker();  
                        });
                    },10);
                    classCheck();     
                    }
            }); //END of MAIN PROGRAM
        }    
    });
});

