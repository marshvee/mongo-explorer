function generateCollectionSelector() {
  let dbName = document.querySelector("#db-selector").value;
  let colSelector = document.querySelector("#col-selector");

  if (dbName == "") {
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
  let dbName = document.querySelector("#db-selector").value;
  let colName = document.querySelector("#col-selector").value;
  let table = document.querySelector("#records-table");
  table.innerHTML = "";

  if (colName != "") {
    fetch(`databases/${dbName}/collections/${colName}/records`)
      .then(res => res.json())
      .then(records => {
        if (records.length > 0) {
          // Build table head
          let head = document.createElement("thead");
          head.className = "thead-dark";
          let tr = document.createElement("tr");
          let col = document.createElement("th");
          col.scope = "col";
          col.innerHTML = "#";
          tr.appendChild(col);
          for (att in records[0]) {
            let col = document.createElement("th");
            col.scope = "col";
            col.innerHTML = att;
            tr.appendChild(col);
          }
          head.appendChild(tr);
          table.appendChild(head);
          // Build table body
          let body = document.createElement("tbody");
          let count = 1;
          for (record of records) {
            let tr = document.createElement("tr");
            let row = document.createElement("th");
            row.scope = "row";
            row.innerHTML = count;
            tr.appendChild(row);
            for (att in records[0]) {
              let col = document.createElement("td");
              col.innerHTML = record[att];
              tr.appendChild(col);
            }
            body.appendChild(tr);
            count += 1;
          }
          table.appendChild(body);
        }
      })
  }
}

let dbSelector = document.querySelector("#db-selector");
let colSelector = document.querySelector("#col-selector");

dbSelector.addEventListener("change", generateCollectionSelector);
colSelector.addEventListener("change", generateCollectionTable);