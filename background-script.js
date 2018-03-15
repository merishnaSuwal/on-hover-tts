// ON MESSAGE FROM THE CONTENT-SCRIPT
chrome.runtime.onMessage.addListener(function(request) {
      // SPEAK OPERATION
      chrome.tts.speak(request.toSay, 
      {
       rate: parseInt(request.speakRate)
      });
      // STOP OPERATION
      if (request.operation === "STOP"){
        chrome.tts.stop();
      }
      // PAUSE OPERATION
      if (request.operation === "PAUSE"){
        chrome.tts.pause();
      }
      // RESUME OPERATION
       if (request.operation === "RESUME"){
        chrome.tts.resume();
      }  
});

