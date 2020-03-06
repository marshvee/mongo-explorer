function onColSelection() {
  let dbName = document.querySelector("#db-selector").value;
  let colName = document.querySelector("#col-selector").value;
  let table = document.querySelector("#records-table");
  let form_create = document.querySelector("#record-create");
  let form_update = document.querySelector("#record-update");
  table.innerHTML = "";
  form_create.innerHTML = "";
  form_update.innerHTML = "";

  if (colName != "") {
    fetch(`databases/${dbName}/collections/${colName}/records`)
      .then(res => res.json())
      .then(records => {
        if (records.length > 0) {
          populateRecordsTable(table, records, dbName, colName);
          // Create form
          let title = document.createElement("h2");
          title.textContent = "Create record";
          form_create.appendChild(title);
          let form = document.createElement("form");
          populateCreateForm(form, records[records.length - 1]);
          form.addEventListener("submit", createRecord(dbName, colName));
          form_create.appendChild(form);
          // Update form
          title = document.createElement("h2");
          title.textContent = "Update record";
          form_update.appendChild(title);
          form = document.createElement("form");
          populateUpdateForm(form, records[records.length - 1]);
          form_update.appendChild(form);
        }
      })
  }
}

function reloadTable() {
  let dbName = document.querySelector("#db-selector").value;
  let colName = document.querySelector("#col-selector").value;
  let table = document.querySelector("#records-table");
  table.innerHTML = "";

  if (colName != "") {
    fetch(`databases/${dbName}/collections/${colName}/records`)
      .then(res => res.json())
      .then(records => {
        if (records.length > 0) {
          populateRecordsTable(table, records, dbName, colName);
        }
      })
  }
}

function generateDeleteButton(col, dbName, colName, recordID) {
  let btn = document.createElement("button");
  btn.type = "button";
  btn.className = "btn btn-danger";
  btn.textContent = "Delete";
  btn.addEventListener("click", deleteRecord(dbName, colName, recordID));
  col.appendChild(btn);
}

function generateUpdateButton(col, dbName, colName, recordID) {
  let btn = document.createElement("button");
  btn.type = "button";
  btn.className = "btn btn-primary";
  btn.textContent = "Update";
  //btn.addEventListener("click", deleteRecord(dbName, colName, recordID));
  col.appendChild(btn);
}

function populateRecordsTable(table, records, dbName, colName) {
  // Build table head
  let head = document.createElement("thead");
  head.className = "thead-dark";
  let tr = document.createElement("tr");
  let col = document.createElement("th");
  col.scope = "col";
  col.textContent = "Actions";
  tr.appendChild(col);
  col = document.createElement("th");
  col.scope = "col";
  col.textContent = "";
  tr.appendChild(col);
  col = document.createElement("th");
  col.scope = "col";
  col.textContent = "#";
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
    let col = document.createElement("td");
    generateUpdateButton(col, dbName, colName, record["_id"]);
    tr.appendChild(col);
    col = document.createElement("td");
    generateDeleteButton(col, dbName, colName, record["_id"]);
    tr.appendChild(col);
    let row = document.createElement("th");
    row.scope = "row";
    row.textContent = count;
    tr.appendChild(row);
    for (att in records[records.length - 1]) {
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

function populateCreateForm(form, record) {
  for (att in record) {
    if (att !== "_id") {
      let form_group = document.createElement("div");
      form_group.className = "form-group";
      let label = document.createElement("label");
      label.setAttribute("for", att);;
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
  btn.className = "btn btn-primary";
  btn.textContent = "Create";
  btn.type = "submit";
  form.appendChild(btn);
}

function populateUpdateForm(form, record) {
  let fieldset = document.createElement("fieldset");
  for (att in record) {
    if (att !== "_id") {
      let form_group = document.createElement("div");
      form_group.className = "form-group";
      let label = document.createElement("label");
      label.setAttribute("for", att);;
      label.textContent = att;
      let input = document.createElement("input");
      input.type = "text";
      input.className = "form-control update";
      input.id = att;
      input.setAttribute("disabled", true);
      form_group.appendChild(label);
      form_group.appendChild(input);
      fieldset.appendChild(form_group);
    }
  }
  let btn = document.createElement("button");
  btn.className = "btn btn-primary";
  btn.textContent = "Update";
  btn.type = "submit";
  fieldset.appendChild(btn);
  fieldset.setAttribute("disabled", true);
  form.appendChild(fieldset);
}

function activateUpdateForm(form, record) {
  for (att in record) {
    if (att !== "_id") {
      let input = document.querySelector(".");
      input.type = "text";
      input.className = "form-control";
      input.id = att;
      form_group.appendChild(label);
      form_group.appendChild(input);
      form.appendChild(form_group);
    }
  }
  let btn = document.createElement("button");
  btn.className = "btn btn-primary";
  btn.textContent = "Create";
  btn.type = "submit";
  form.appendChild(btn);
}

function createRecord(dbName, colName) {
  return (event) => {
    event.preventDefault();
    let record = {};
    let inputs = document.querySelectorAll("#record-create form .form-group input");
    for (input of inputs) {
      record[input.labels[0].textContent] = input.value;
    }
    fetch(`databases/${dbName}/collections/${colName}/records`, {
      method: 'POST',
      body: JSON.stringify(record),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then((result) => {
        reloadTable();
        alert(`Record succesfully added to collection ${colName} in database ${dbName} with id ${result.insertedId}`);
        window.scrollTo(0, 0);
      })

  }
}

function deleteRecord(dbName, colName, recordID) {
  return (event) => {
    event.preventDefault();
    fetch(`databases/${dbName}/collections/${colName}/records/${recordID}`, {
      method: 'DELETE'
    })
      .then(() => {
        reloadTable();
        alert(`Record succesfully deleted from collection ${colName} in database ${dbName}!`);
      })

  }
}


let colSelector = document.querySelector("#col-selector");
colSelector.addEventListener("change", onColSelection);