
chrome.runtime.onMessage.addListener(function(request) {
      chrome.tts.speak(request.toSay, 
      {
       rate: parseInt(request.speakRate)
      });
      if (request.stop === "YES"){
        chrome.tts.stop();
      }
      if (request.pauser === "YES"){
        chrome.tts.pause();
      }
       if (request.resumer === "YES"){
        chrome.tts.resume();
      }
    
});

