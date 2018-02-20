chrome.runtime.onMessage.addListener(function(request) {
  chrome.tts.speak(request.toSay, 
                  { rate: 1 });
  if (request.toSay == "STOP"){
    chrome.tts.stop();
  }
  if (request.toSay == "PAUSE"){
    chrome.tts.pause();
  }
  if (request.toSay == "RESUME"){
    chrome.tts.resume();
  }
});