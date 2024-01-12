const wallpaperSourceFolder = "assets/images/backgrounds";
const numWallpapers = 11;
const switchInterval = 60;
const fadeTime = Number(getComputedStyle(document.body).getPropertyValue("--fade-time").replace("s", ""));

window.heroElement = document.getElementsByClassName("hero")[0];
const heroLoader = document.getElementsByClassName("hero-loader")[0];
const heroImage = document.getElementsByClassName("hero-image")[0];
let wallpapers = [];
for (let i=0; i<numWallpapers; i++) {
  wallpapers.push(`${wallpaperSourceFolder}/wallpaper-${i}.jpg`);
}

function generateWallpaperIdArray() {
  let output = [];
  for (let i=0; i<numWallpapers; i++) {
    output.push(i);
  }
  return output;
};

let wallpaperIdArray = generateWallpaperIdArray();

function getShuffledWallpaper() {
  if (wallpaperIdArray.length === 0) {
    wallpaperIdArray = generateWallpaperIdArray();
  }
  const nextWallpaperIdId = Math.round(Math.random() * (wallpaperIdArray.length - 1));
  const nextWallpaperId = wallpaperIdArray[nextWallpaperIdId];
  wallpaperIdArray.splice(nextWallpaperIdId, 1);
  return wallpapers[nextWallpaperId];
};

const initImageSrc = getShuffledWallpaper();
heroLoader.src = initImageSrc;
heroImage.src = initImageSrc;

function loadFadeImage(imageSrc) {
  heroLoader.src = imageSrc;
  heroLoader.classList.add("dont-transition"); // this line prevents an error at initial run
  heroLoader.classList.remove("dont-transition");
  heroLoader.onload = function() {
    heroLoader.style.opacity = 1;
    setTimeout(function() {
      heroImage.src = imageSrc;
      heroLoader.classList.add("dont-transition");
      heroLoader.style.opacity = 0;
    }, fadeTime * 1000);
  };
};

window.wallpaperFadeInterval = setInterval(function() {
  loadFadeImage(getShuffledWallpaper());
}, switchInterval * 1000);

function changeWallpaperNow() {
  clearInterval(window.wallpaperFadeInterval);
  window.wallpaperFadeInterval = setInterval(function() {
    loadFadeImage(getShuffledWallpaper());
  }, switchInterval * 1000);

  loadFadeImage(getShuffledWallpaper());
}