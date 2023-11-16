function activateTranslate() {
  document.getElementById("translate_activator_form").submit()
}

let myTimeout;
function translateUpdated() {
  clearTimeout(myTimeout);
  myTimeout = setTimeout(translate, 2000);
}
function translate() {
  document.getElementById("translate_output").value = Math.random();
  translateString = document.getElementById("translate_source").value;
  if (translateString !== "") {
    document.getElementById("string_to_translate").value = translateString;
    activateTranslate();
  }
}