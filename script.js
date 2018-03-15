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
                function ttsSpeaker(x,y){
                    chrome.runtime.sendMessage({speakRate: y, toSay: x, operation:"SPEAK" }, function() {});
                }
                function ttsStop(x,y){
                    chrome.runtime.sendMessage({speakRate: y, toSay: x, operation:"STOP"}, function() {});
                }
                function ttsPause(x,y){
                    chrome.runtime.sendMessage({speakRate: y, toSay: x, operation:"PAUSE"}, function() {});
                }
                function ttsResume(x,y){
                    chrome.runtime.sendMessage({speakRate: y,toSay: x, operation:"RESUME" }, function() {});
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
                        ttsSpeaker(msgtext,items.setRate);
                        ttsSpeaker(msgalt,items.setRate);
                        ttsSpeaker(msglabel,items.setRate);
                        ttsSpeaker(inputtext,items.setRate);
                    }

                    function pauseSpeaker(){
                        target.removeClass("speakText");
                        ttsPause(msgtext,items.setRate);
                        ttsPause(msgalt,items.setRate);
                        ttsPause(msglabel,items.setRate);
                        ttsPause(inputtext,items.setRate);
                    }
                    function resumeSpeaker(){
                        target.addClass("speakText");
                        ttsResume(msgtext,items.setRate);
                        ttsResume(msgalt,items.setRate);
                        ttsResume(msglabel,items.setRate);
                        ttsResume(inputtext,items.setRate);

                    }
                    //TO STOP
                    function stopSpeaker()
                    {
                        target.removeClass("speakText");
                        ttsStop();
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