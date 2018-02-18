function save_options() {
  var state = document.getElementById('state').value;
  var slider = document.getElementById("myRange").value;
  var output = document.getElementById("demo");
  chrome.storage.sync.set({
    setState: state,
    setRate: slider,
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
    chrome.tabs.query({windowType:'normal'}, function(tabs) {
      for(var i = 0; i < tabs.length; i++) {
          chrome.tabs.update(tabs[i].id, {url: tabs[i].url});
      }
    }); 
    close();
  });
}
function restore_options() {
  chrome.storage.sync.get({
    setState: 'enable',
    setRate: '0.5',
  }, function(items) {
    document.getElementById('state').value = items.setState;
    document.getElementById("myRange").value = items.setRate;
    document.getElementById("demo").innerHTML = document.getElementById("myRange").value/2;
  });
}

var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value/2; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
    output.innerHTML = this.value/2;
} 
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);


