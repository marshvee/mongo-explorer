function onColSelection() {
  let dbName = document.querySelector("#db-selector").value;
  let colName = document.querySelector("#col-selector").value;
  let table = document.querySelector("#records-table");
  let form = document.querySelector("#record-create");
  table.innerHTML = "";
  form.innerHTML = "";

  if (colName != "") {
    fetch(`databases/${dbName}/collections/${colName}/records`)
      .then(res => res.json())
      .then(records => {
        if (records.length > 0) {
          populateRecordsTable(table, records);
          populateRecordForm(form, records[0]);
        }
      })
  }
}

function populateRecordsTable(table, records) {
  // Build table head
  let head = document.createElement("thead");
  head.className = "thead-dark";
  let tr = document.createElement("tr");
  let col = document.createElement("th");
  col.scope = "col";
  col.innerHTML = "#";
  tr.appendChild(col);
  for (att in records[0]) {
    if (att !== "_id") {
      let col = document.createElement("th");
      col.scope = "col";
      col.textContent = att;
      tr.appendChild(col);
    }
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
    row.textContent = count;
    tr.appendChild(row);
    for (att in records[0]) {
      if (att !== "_id") {
        let col = document.createElement("td");
        col.textContent = record[att];
        tr.appendChild(col);
      }
    }
    body.appendChild(tr);
    count += 1;
  }
  table.appendChild(body);
}

function populateRecordForm(form, record) {
  for (att in record) {
    if (att !== "_id") {
      let form_group = document.createElement("div");
      form_group.className = "form-group";
      let label = document.createElement("label");
      label.for = att;
      label.textContent = att;
      let input = document.createElement("input");
      input.type = "text";
      input.className = "form-control";
      input.id = att;

      form_group.appendChild(label);
      form_group.appendChild(input);
      form.appendChild(form_group);
    }
  }
  let btn = document.createElement("button");
  btn.type = "submit";
  btn.className = "btn btn-primary";
  btn.textContent = "Create";
  form.appendChild(btn);
}

let colSelector = document.querySelector("#col-selector");
colSelector.addEventListener("change", onColSelection);