const Generator = {
  Desktop: {
    generatorName: "desktop", // used by Generator functions for handling special generator features
    categories: [
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
    ],
    codeElement: document.getElementById("generator-code"),
    useTerminal: document.getElementById("generator-terminal-checkbox"),
    execPath: document.getElementById("generator-input-exec"),
    name: document.getElementById("generator-input-name"),
    icon: document.getElementById("generator-input-icon"),
    comment: document.getElementById("generator-input-desc"),
    categoriesElement: document.getElementsByClassName("generator-categories")[0],
    selectionFitterElement: document.getElementById("fit-current-selection-select"),
    categoriesList: "",
    selectElements: [],
    generateFieldsArray: function() {
      this.fields = [
        this.useTerminal,
        this.execPath,
        this.name,
        this.icon,
        this.comment
      ]
    },
    generatorAddTo: function(propertyToAdd, value) {
      if (typeof value == "string" && value === "") {
        return "";
      } else if (typeof value != "string" && typeof value != "boolean") {
        return "";
      }

      return `\n${propertyToAdd}=${value}`;
    },
    generateDesktopFile: function(generatorTerminal, generatorExecPath, generatorName, generatorIcon, generatorComment) {
      let output = `[Desktop Entry]\nEncoding=UTF-8\nVersion=1.0\nType=Application`;
      output += this.generatorAddTo("Terminal", generatorTerminal);
      output += this.generatorAddTo("Exec", generatorExecPath);
      output += this.generatorAddTo("Name", generatorName);
      output += this.generatorAddTo("Icon", generatorIcon);
      output += this.generatorAddTo("Comment", generatorComment);
      output += this.generatorAddTo("Categories", this.categoriesList);

      this.codeElement.value = output;
    },
    doGenerate: function() {
      this.generateDesktopFile(this.useTerminal.checked, this.execPath.value, this.name.value, this.icon.value, this.comment.value);
    },
    fitSelectContent: function(selectContent) {
      this.selectionFitterElement.style.visibility = "visible";
      this.selectionFitterElement.options[0].innerHTML = selectContent;
      let outputWidth = this.selectionFitterElement.getBoundingClientRect().width + "px";
      this.selectionFitterElement.style.visibility = "hidden";
      return outputWidth;
    },
    generateSelectElement: function() {
      let lastSelect = document.createElement("select");
      let firstOption = document.createElement("option");
      firstOption.value = "0";
      firstOption.innerHTML = "+";
      lastSelect.appendChild(firstOption);
      lastSelect.isInit = true;

      for (let i=1; i<this.categories.length+1; i++) {
        let myOption = document.createElement("option");
        myOption.value = i.toString();
        myOption.innerHTML = this.categories[i-1][0];
        lastSelect.appendChild(myOption);
      }

      lastSelect.onchange = function() {
        this.style.width = Generator.Desktop.fitSelectContent(this.options[this.selectedIndex].innerHTML);
        if (this.selectedIndex !== 0) {
          this.options[0].innerHTML = "Remove This Category";
          let toGenerate = true;
          Generator.Desktop.categoriesList += Generator.Desktop.categories[this.selectedIndex-1][1] + ";";

          if (this.isInit) {
            for (let i=0; i<Generator.Desktop.selectElements.length; i++) {
              if (this !== Generator.Desktop.selectElements[i] && this.selectedIndex === Generator.Desktop.selectElements[i].selectedIndex) {
                toGenerate = false;
              }
            }
            if (toGenerate) {
              Generator.Desktop.generateSelectElement();
              this.isInit = false;
            } else {
              this.selectedIndex = 0;
              this.options[0].innerHTML = "Category Already Selected";
              this.style.width = Generator.Desktop.fitSelectContent(this.options[0].innerHTML);
            }
          }
          this.lastValidIndex = this.selectedIndex.valueOf();
        } else {
          Generator.Desktop.categoriesElement.removeChild(this);
          Generator.Desktop.categoriesList = Generator.Desktop.categoriesList.replace(Generator.Desktop.categories[this.lastValidIndex-1][1] + ";", "");
          for (let i=0; i<Generator.Desktop.selectElements.length; i++) {
            if (Generator.Desktop.selectElements[i] == this) {
              Generator.Desktop.selectElements.splice(i, 1);
              break;
            }
          }

          if (Generator.Desktop.selectElements.length === 0) {
            Generator.Desktop.generateSelectElement();
          }
        }
        Generator.Desktop.doGenerate();
      };

      lastSelect.style.width = Generator.Desktop.fitSelectContent("+");
      Generator.Desktop.categoriesElement.appendChild(lastSelect);
      Generator.Desktop.selectElements.push(lastSelect);
    },
    download: function() {
      this.doGenerate();
      const blob = new Blob([Generator.Desktop.codeElement.value], {
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
    },
  },

  clearFields: function(generator) {
    for (let i=0; i<generator.fields.length; i++) {
      const curField = generator.fields[i];
      if (curField.type === "text") {
        curField.value = "";
      } else if (curField.type === "checkbox") {
        curField.checked = curField.defaultChecked;
      } else {
        throw "Type of this field is not supported"
      }
    }

    if (generator.generatorName === "desktop") {
      generator.categoriesList = "";
      for (let i=0; i<generator.selectElements.length; i++) {
        generator.categoriesElement.removeChild(generator.selectElements[i]);
      }
      generator.selectElements = [];
      generator.generateSelectElement();
    }
    generator.doGenerate();
  }
};

with (Generator.Desktop) {
  generateFieldsArray();
  generateSelectElement();
  doGenerate();
}