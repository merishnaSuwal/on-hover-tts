var tagList = ['HTML', 'HEAD', 'BODY', 'DIV', 'SECTION']; 
var isSpeaking = false;


$(document).ready(function(){ 
    chrome.storage.sync.get({
        setState: 'enable',
        setRate: '0.5',
        }, function(items) {
            if (items.setState === "enable")
            {
            $(document).keydown(function(e){
                if(e.key == 'F11')
                {
                    var fullscreentext = "Full screen on";
                    var fullscreenmsg = new SpeechSynthesisUtterance(fullscreentext);
                    fullscreenmsg.rate=items.setRate;
                    chrome.runtime.sendMessage({toSay: fullscreentext}, function() {});
                  //  speechSynthesis.speak(fullscreenmsg);   
                }
            });
	    // START OF
            // MAIN PROGRAM
            function ttsSpeaker(x){
                chrome.runtime.sendMessage({toSay: x}, function() {});
            }
            function ttsStopper(x){
                chrome.runtime.sendMessage({toSay: "STOP"}, function() {});
            }

            $(document).mousemove(function (e) {
                //SELECT TARGET

                var target = $(e.target);
                if(target!=$(e.target){

                //FOR INPUT FIELD
                var inputtext = target.attr("placeholder");
                if(target.prop("tagName")=="INPUT"){
                 inputtext = "Input field" + inputtext;
                }
                //FOR BUTTON TEXT
                var msgtext = target.text();
                if(target.prop("tagName")=="BUTTON"){
                   msgtext = "Button text" + msgtext;
                }
                if(target.prop("tagName")=="A"){
                   msgtext = "Link text" + msgtext;
                }
                //FOR ALT TEXT
                var msgalt = target.attr("alt");

                //FOR ARIA LABELS
                var msglabel= target.attr('aria-label');
                }
                //TO SPEAK
                function speaker()
                {   
                    ttsSpeaker(msgtext);
                    ttsSpeaker(msgalt);
                    ttsSpeaker(msglabel);
                    ttsSpeaker(inputtext);
                }

                function pauseSpeaker(){
                    target.removeClass("speakText");
                    ttsStopper();
                }
                function resumeSpeaker(){
                    target.addClass("speakText");
                    ttsStopper();
                }
                //TO STOP
                function stopSpeaker()
                {
                    target.removeClass("speakText");
                    ttsStopper();
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
                                }
                                $(document).keyup(function(e) {
                                    if(!isSpeaking){
                                    
                                        if(e.key === "Shift"){
                                            resumeSpeaker();
                                            var isSpeaking = true;
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

