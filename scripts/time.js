const timeText = document.getElementById("time").firstChild;
const initTime = new Date();
function setTime() {
  const now = new Date();
  minutes = now.getMinutes();
  if (minutes >= 0 && minutes < 10) {
    minutes = minutes.toString();
    minutes = "0" + minutes;
  }
  timeText.data = `${now.getHours()}:${minutes}`
}

setTime();


/* TODO: fix this later
setTimeout(function() {
  setInterval(function() {
    setTime();
  }, 60 * 1000);
}, 60 * 1000 - (initTime.getSeconds() * 1000 + initTime.getMilliseconds()));
*/
window.timeSetter = setInterval(function() {
  setTime();
}, 1000);