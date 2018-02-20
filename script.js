var tagList = ['HTML', 'HEAD', 'BODY', 'DIV', 'SECTION']; 
var isSpeaking = false;


$(document).ready(function(){ 
    chrome.storage.sync.get({
        setState: 'enable',
        setRate: '0.5',
        }, function(items) {
            if (items.setState === "enable")
            {
            
	    // START OF
            // MAIN PROGRAM
            function ttsSpeaker(x){
                chrome.runtime.sendMessage({toSay: x, stop: "NO", resumer: "NO", pauser: "NO"}, function() {});
            }
            function ttsStop(x){
                chrome.runtime.sendMessage({toSay: x, stop: "YES", resumer: "NO", pauser: "NO"}, function() {});
            }
            function ttsPause(x){
                chrome.runtime.sendMessage({toSay: x, stop: "NO", resumer: "NO", pauser: "YES"}, function() {});
            }
            function ttsResume(x){
                chrome.runtime.sendMessage({toSay: x, stop: "NO", resumer: "YES", pauser: "NO"}, function() {});
            }
            $(document).keydown(function(e){
                if(e.key == 'F11')
                {
                    var fullscreentext = "Full screen on";
                    ttsSpeaker(fullscreentext);
                }
            });

            $(document).mouseover(function (e) {
                //SELECT TARGET

                var target = $(e.target);                

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
                    ttsPause(msgtext);
                    ttsPause(msgalt);
                    ttsPause(msglabel);
                    ttsPause(inputtext);
                }
                function resumeSpeaker(){
                    target.addClass("speakText");
                    ttsResume(msgtext);
                    ttsResume(msgalt);
                    ttsResume(msglabel);
                    ttsResume(inputtext);

                }
                //TO STOP
                function stopSpeaker()
                {
                    target.removeClass("speakText");
                    ttsStop("STOP");
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

