const desktopCategories = [
  // FriendlyName, SpecificationName
  ["Accessories", "Utility"],
  ["Development", "Development"],
  ["Education", "Education"],
  ["Game", "Game"],
  ["Graphical", "Graphics"],
  ["Internet", "Network"],
  ["Office", "Office"],
  ["Scientific", "Science"],
  ["Settings", "Settings"],
  ["Sound and Video", "AudioVideo"],
  ["System Tool", "System"]
];
const generatorElement = document.getElementById("generator-code");
const useTerminal = document.getElementById("generator-terminal-checkbox");
const desktopExecPath = document.getElementById("generator-input-exec")
const desktopName = document.getElementById("generator-input-name");
const desktopIcon = document.getElementById("generator-input-icon");
const desktopComment = document.getElementById("generator-input-desc");
const categoriesElement = document.getElementsByClassName("generator-categories")[0];
const selectionFitterElement = document.getElementById("fit-current-selection-select");
let categoriesList = "";
window.selectElements = [];
function generatorAddTo(propertyToAdd, value) {
  if (typeof value == "string" && value == "") {
    return "";
  } else if (typeof value != "string" && typeof value != "boolean") {
    return "";
  }

  return `\n${propertyToAdd}=${value}`;
}
function generateDesktopFile(generatorTerminal, generatorExecPath, generatorName, generatorIcon, generatorComment) {
  let output = `[Desktop Entry]\nEncoding=UTF-8\nVersion=1.0\nType=Application`;
  output += generatorAddTo("Terminal", generatorTerminal);
  output += generatorAddTo("Exec", generatorExecPath);
  output += generatorAddTo("Name", generatorName);
  output += generatorAddTo("Icon", generatorIcon);
  output += generatorAddTo("Comment", generatorComment);
  output += generatorAddTo("Categories", categoriesList);
  
  generatorElement.value = output;
};

function doGenerate() {
  generateDesktopFile(useTerminal.checked, desktopExecPath.value, desktopName.value, desktopIcon.value, desktopComment.value);
};

function fitSelectContent(selectContent) {
  selectionFitterElement.style.visibility = "visible";
  selectionFitterElement.options[0].innerHTML = selectContent;
  let outputWidth = selectionFitterElement.getBoundingClientRect().width + "px";
  selectionFitterElement.style.visibility = "hidden";
  return outputWidth;
};

function generateSelectElement() {
  let lastSelect = document.createElement("select");
  let firstOption = document.createElement("option");
  firstOption.value = "0";
  firstOption.innerHTML = "+";
  lastSelect.appendChild(firstOption);
  lastSelect.isInit = true;

  for (let i=1; i<desktopCategories.length+1; i++) {
    let myOption = document.createElement("option");
    myOption.value = i.toString();
    myOption.innerHTML = desktopCategories[i-1][0];
    lastSelect.appendChild(myOption);
  }

  lastSelect.onchange = function() {
    this.style.width = fitSelectContent(this.options[this.selectedIndex].innerHTML);
    if (this.selectedIndex != 0) {
      this.options[0].innerHTML = "Remove This Category";
      let toGenerate = true;
      categoriesList += desktopCategories[this.selectedIndex-1][1] + ";";
      
      if (this.isInit) {
        for (let i=0; i<selectElements.length; i++) {
          if (this != selectElements[i] && this.selectedIndex == selectElements[i].selectedIndex) {
            toGenerate = false;
          }
        }
        if (toGenerate) {
          generateSelectElement();
          this.isInit = false;
        } else {
          this.selectedIndex = 0;
          this.options[0].innerHTML = "Category Already Selected";
          this.style.width = fitSelectContent(this.options[0].innerHTML);
        }
      }
      this.lastValidIndex = this.selectedIndex.valueOf();
    } else {
      categoriesElement.removeChild(this);
      categoriesList = categoriesList.replace(desktopCategories[this.lastValidIndex-1][1] + ";", "");
      for (let i=0; i<selectElements.length; i++) {
        if (selectElements[i] == this) {
          selectElements.splice(i, 1);
          break;
        }
      }

      if (window.selectElements.length == 0) {
        generateSelectElement();
      }
    }
    doGenerate();
  };

  lastSelect.style.width = fitSelectContent("+");
  categoriesElement.appendChild(lastSelect);
  selectElements.push(lastSelect);
};

function generatorDownload() {
  doGenerate();
  const blob = new Blob([generatorElement.value], {
    type: "octet/stream;charset=utf-8"
  });
  const a = document.createElement("a");
  const url = window.URL.createObjectURL(blob);
  document.body.appendChild(a);
  a.style.display = "none";
  a.href = url;
  a.download = "desktop-file";
  a.click();
  window.URL.revokeObjectURL(url);
};

function generatorClear() {
  useTerminal.checked = false;
  desktopName.value = "";
  desktopComment.value = "";
  desktopIcon.value = "";
  desktopExecPath.value = "";

  categoriesList = "";
  for (let i=0; i<selectElements.length; i++) {
    categoriesElement.removeChild(selectElements[i]);
  }
  selectElements = [];
  generateSelectElement();
  doGenerate();
};

generateSelectElement();
doGenerate();