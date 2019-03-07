var socket = io();
var servertid = document.getElementById('server-time');
var form_btn = document.getElementById('form-btn');
var form_txt = document.getElementById('form-text');

socket.on('time', function(timeString) {
  el.innerHTML = 'Server time: ' + timeString;
});

socket.on('msg', function(txt) {
  var p = document.createElement("P")
  var t = document.createTextNode(txt);
  p.appendChild(t);
  document.body.appendChild(p);
});

form_btn.addEventListener("click", formClick)
form_txt.addEventListener("keyup", function(event){
  if (event.keyCode === 13) {
    event.preventDefault();

    form_btn.click();
  }
});

function formClick() {
  socket.emit("msg", form_txt.value);
  form_txt.value = "";
}
