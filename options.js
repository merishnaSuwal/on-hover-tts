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
    console.log(document.getElementById('state').value);
  });
}
function restore_options() {
  chrome.storage.sync.get({
    setState: 'enable',
    setRate: '1',
  }, function(items) {
    document.getElementById('state').value = items.setState;
    document.getElementById("myRange").value = items.setRate;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
    output.innerHTML = this.value;
}

