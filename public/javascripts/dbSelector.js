function generateCollections() {
  let dbName = document.querySelector(".db-selector").value;
  console.log(dbName);
}

let selector = document.querySelector(".db-selector");

selector.addEventListener("change", generateCollections);