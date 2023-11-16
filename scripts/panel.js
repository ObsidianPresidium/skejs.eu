const panelsDOM = document.getElementsByClassName("panel");
const panelsDOMInitLength = panelsDOM.length;
const panelsObject = {};
const openPanelByDefault = "none";

for (let i=0; i<panelsDOMInitLength; i++) {
  panelsObject[panelsDOM[0].id] = panelsDOM[0];
  window.heroElement.removeChild(panelsDOM[0]);
}

function panel(panelToShow, buttonElement) {
  const myPanel = panelsObject[panelToShow];
  if (myPanel.classList.contains("hidden")) {
    if (typeof buttonElement !== "undefined") buttonElement.classList.add("btn-toggled");
    window.heroElement.appendChild(myPanel);
    setTimeout(function() {
      myPanel.classList.remove("hidden");
      myPanel.classList.add("shown-panel");
      if (getLayoutMode() == "list") {
        myPanel.scrollIntoView();
      }
    }, 1);
  } else {
    if (typeof buttonElement !== "undefined") buttonElement.classList.remove("btn-toggled");
    myPanel.classList.add("hidden");
    myPanel.classList.remove("shown-panel");
    setTimeout(function() {
      window.heroElement.removeChild(myPanel);
    }, 250)
  }
};

if (openPanelByDefault !== "none") {
  panel(openPanelByDefault);
}