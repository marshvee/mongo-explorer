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
  let stats = document.querySelector("#col-stats .row");
  let table = document.querySelector("#records-table");
  let form_create = document.querySelector("#record-create");
  let form_update = document.querySelector("#record-update");
  colSelector.innerHTML = "";
  table.innerHTML = "";
  stats.innerHTML = "";
  form_create.innerHTML = "";
  form_update.innerHTML = "";

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