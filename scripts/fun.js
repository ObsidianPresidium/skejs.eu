function íslandsveldi() {
  let iteration = 0;
  clearInterval(window.wallpaperFadeInterval);
  clearInterval(window.timeSetter);
  function showIceland() {
    switch (iteration % 3) {
      case 0:
        loadFadeImage(wallpapers[6]);
        break;
      case 1:
        loadFadeImage(wallpapers[7]);
        break;
      case 2:
        loadFadeImage(wallpapers[8]);
        break;
      default:
        document.write("what the fuck");
    }
    iteration ++;
  }

  showIceland();
  setInterval(showIceland, 5000);

  document.getElementById("time").firstChild.data = "🇮🇸";
  document.querySelector(".box h1").firstChild.data = "Ísland!"
}