function generateCollectionSelector() {
  let dbName = document.querySelector("#db-selector").value;
  let colSelector = document.querySelector("#col-selector");

  if (dbName === "") {
    colSelector.innerHTML = "";
    let option = document.createElement("option");
    option.value = "";
    option.innerHTML = "---------------------------";
    colSelector.appendChild(option);
  }
  else {
    fetch(`databases/${dbName}/collections`)
      .then(res => res.json())
      .then(cols => {
        colSelector.innerHTML = "";
        let option = document.createElement("option");
        option.value = "";
        option.innerHTML = "--Please choose an option--";
        colSelector.appendChild(option);
        for (col of cols) {
          let option = document.createElement("option");
          option.value = col.name;
          option.innerHTML = col.name;
          colSelector.appendChild(option);
        }
      })
  }
}

function generateCollectionTable() {
  let colName = document.querySelector("#col-selector").value;
  if (dbName === "") {

  }
  else {

  }
}

let dbSelector = document.querySelector("#db-selector");
let colSelector = document.querySelector("#col-selector");

dbSelector.addEventListener("change", generateCollectionSelector);
colSelector.addEventListener("change", generateCollectionTable);