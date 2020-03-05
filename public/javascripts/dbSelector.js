function generateCollections() {
  let dbName = document.querySelector("#db-selector").value;
  let colSelector = document.querySelector("#col-selector");
  console.log(dbName);
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
        console.log(cols);
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

let dbSelector = document.querySelector("#db-selector");

dbSelector.addEventListener("change", generateCollections);