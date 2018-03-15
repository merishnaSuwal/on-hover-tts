chrome.runtime.onMessage.addListener(function(request) {
      chrome.tts.speak(request.toSay, 
      {
       rate: parseInt(request.speakRate)
      });
      if (request.operation === "STOP"){
        chrome.tts.stop();
      }
      if (request.operation === "PAUSE"){
        chrome.tts.pause();
      }
       if (request.operation === "RESUME"){
        chrome.tts.resume();
      }
    
});

