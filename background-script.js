
chrome.runtime.onMessage.addListener(function(request) {
   chrome.tts.speak(request.toSay, 
      {
       rate: 1 
      });

   if(request.pauser==="YES")
    {
        chrome.tts.pause();
    }

    if (request.stop === "YES"){
      chrome.tts.stop();
    }
    if(request.resumer === "YES")
    {
       chrome.tts.resume();
    }
    
});

