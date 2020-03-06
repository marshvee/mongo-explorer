function populateColSelector(colSelector, cols) {
  let option = document.createElement("option");
  option.value = "";
  option.textContent = "--Please choose an option--";
  colSelector.appendChild(option);
  for (col of cols) {
    let option = document.createElement("option");
    option.value = col.name;
    option.textContent = col.name;
    colSelector.appendChild(option);
  }
}

function onDbSelection() {
  let dbName = document.querySelector("#db-selector").value;
  let colSelector = document.querySelector("#col-selector");
  let table = document.querySelector("#records-table");
  let form = document.querySelector("#record-create");
  colSelector.innerHTML = "";
  table.innerHTML = "";
  form.innerHTML = "";

  if (dbName == "") {
    let option = document.createElement("option");
    option.value = "";
    option.textContent = "---------------------------";
    colSelector.appendChild(option);
  }
  else {
    fetch(`databases/${dbName}/collections`)
      .then(res => res.json())
      .then(cols => {
        populateColSelector(colSelector, cols);
      })
  }
}

let dbSelector = document.querySelector("#db-selector");
dbSelector.addEventListener("change", onDbSelection);