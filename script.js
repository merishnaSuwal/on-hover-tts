var tagList = ['HTML', 'HEAD', 'BODY', 'DIV', 'SECTION']; // Excluded list of tags
var isSpeaking = false;

// ON PAGE READY
$(document).ready(function(){ 
    chrome.storage.sync.get({
        setState: 'enable',
        setRate: '0.5',
        }, function(items) {
            if (items.setState === "enable")
            {
               	var screenw = $( window ).width();
                var screenh = $( window ).height();
                console.log(screenw);
                console.log(screenh);
                var mouseX, mouseY;
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
                setTimeout(function(){                                 
                    $(document).mousemove(function(e) {
                        mouseX = e.pageX;
                        mouseY = e.pageY;
                        function alertspeak(){
                            var alerttext = "Mouse outside the window";
                            ttsSpeaker(alerttext, items.setRate);
                            }
                        if (mouseX<=10 || mouseX>=screenw-10) {
                            alertspeak();
                            console.log("OUT");
                        }
                        if (mouseY<=10 || mouseY>=screenh-10) {
                            alertspeak();
                            console.log("OUT");
                        }
                        // console.log("X=");
                        // console.log(mouseX);
                        // console.log("Y=");
                        // console.log(mouseY);

                    }).mouseover();  
                },100);
                // FULLSCREEN KEY ALERT
                $(document).keydown(function(e){
                    if(e.key == 'F11')
                    {
                        var fullscreentext = "Full screen on";
                        ttsSpeaker(fullscreentext, items.setRate);
                    }
                });

                $(document).mouseover(function (e) {
                    // SELECT TARGET
                    var target = $(e.target);                

                    // FOR INPUT FIELDS
                    var inputtext = target.attr("placeholder");
                    if(target.prop("tagName")=="INPUT"){
                     inputtext = "Input field" + inputtext;
                    }
                    // FOR BUTTON TEXT
                    var msgtext = target.text();
                    if(target.prop("tagName")=="BUTTON"){
                       msgtext = "Button text" + msgtext;
                    }
                    // FOR LINK TEXTS
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

                    // PAUSE THE SPEAKER
                    function pauseSpeaker(){
                        target.removeClass("speakText");
                        ttsPause(msgtext,items.setRate);
                        ttsPause(msgalt,items.setRate);
                        ttsPause(msglabel,items.setRate);
                        ttsPause(inputtext,items.setRate);
                    }
                    // RESUME THE SPEAKER
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

                   
                    //TO CHECK CLASS OF THE TARGET 
                    function classCheck()
                    {
                        if(target.is(".speakText") ) {
                            speaker();
                            var isSpeaking=true;

                            // CHECK IF IS SPEAKING = TRUE
                            if(isSpeaking) {
                                $(document).keyup(function(e) {
                                    if(e.key === "Control"){
                                        // TO PAUSE THE SPEAKER
                                        pauseSpeaker();
                                        var isSpeaking = false;
                                    }
                                    $(document).keyup(function(e) {
                                        // CHECK IF THE SPEAKER HAS BEEN PAUSED
                                        if(!isSpeaking){
                                            if(e.key === "Shift"){
                                                // TO RESUME THE SPEAKER
                                                resumeSpeaker();
                                                var isSpeaking = true;
                                            }
                                        }
                                    });
                               });
                            }
                            
                        }  // END OF IF 
                    }  // END OF CLASSCHECK FUNCTION

                    // CHECK IF THE TAGS ARE NOT EXCLUDED
                    if(tagList.indexOf(target.prop("tagName")) == -1){
                        target.addClass("speakText");
                        setTimeout(function(){
                            $(target).mouseleave(function(){
                                stopSpeaker();  // STOP SPEAKER ON MOUSELEAVE
                            });
                        },10);

                        // CHECK FOR "SPEAKTEXT" CLASS
                        classCheck(); 
                        }

                 }); //END of MAIN PROGRAM
            }     
    });
});