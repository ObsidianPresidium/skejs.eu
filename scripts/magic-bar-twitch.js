const urlregex = /^(?:(ftp|http|https):\/\/)?(?:[\w-]+\.)+[a-z]{2,24}$/;

function magicinfo() {
  alert("Usage:\n\nexample.com -> links you to example.com\n\nexample -> links you to google search results page for example\n\n![bang] -> links you to a duckduckgo bang (duckduckgo.com/bang for more info)\n\n //[javascript] -> executes javascript");
}

function lnk(url) {window.location.assign(url)};

function twitch(ix) {
  let url;
  switch (ix) {
    case 1:
      url = "https://twitch.tv/PGL";
      break;
    case 2:
      url = "https://twitch.tv/pgl_csgo";
      break;
    case 3:
      url = "https://twitch.tv/blastpremier";
      break;
    case 4:
      url = "https://twitch.tv/esl_csgo";
      break;
    case 5:
      url = "https://twitch.tv/esl_csgob";
      break;
    case 6:
      url = "https://twitch.tv/cct_en2";
      break;
    case 7:
      url = "https://twitch.tv/74kanm";
      break;
    case 8:
      url = "https://www.twitch.tv/roobetesports";
      break;
    default:
      break;
  }
  lnk(url);
}

const magicbar = document.getElementById("magicbar");
magicbar.addEventListener("keyup", function(event) {
  if (event.keyCode == 13) {
    let val = magicbar.value;
    if (val === "") {
      changeWallpaperNow();
    } else if (val.indexOf("!") == 0) {
      window.location.assign("https://duckduckgo.com/?q=" + encodeURIComponent(val));
    } else if (val.indexOf("//") == 0) {
      if (typeof eval(val.substring(2)) === "function") {
        eval(val.substring(2) + "();")
      }
      
    } else {
      if (urlregex.test(val)) {
        window.location.assign((val.indexOf("http") == -1) ? "https://" + val:val);
      } else {
        window.location.assign("https://google.com/search?q=" + encodeURIComponent(val));
      }
    }
  }
});