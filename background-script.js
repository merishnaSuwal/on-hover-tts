chrome.runtime.onMessage.addListener(function(request) {
  chrome.tts.speak(request.toSay, 
                  { rate: 1 });
  if (request.toSay == "STOP"){
    chrome.tts.stop();
  }
});