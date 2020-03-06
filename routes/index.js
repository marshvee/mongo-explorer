let express = require("express");
let router = express.Router();
let MongoUtils = require("../db/MongoUtils.js");
const ObjectID = require("mongodb").ObjectID;

/* GET home page. */
router.get("/", function (req, res) {
  MongoUtils.getDbs()
    .then(dbInfo => { res.render("index", { dbs: dbInfo.databases }); })
});

/* Collection data end point */
router.get("/databases/:dbName/collections", function (req, res) {
  MongoUtils.getCollections(req.params.dbName)
    .then(cols => { res.send(cols); })
});

/* Records data end point */
router.get("/databases/:dbName/collections/:colName/records", function (req, res) {
  MongoUtils.getRecords(req.params.dbName, req.params.colName)
    .then(records => { res.send(records); })
});

router.post("/databases/:dbName/collections/:colName/records", (req, res) => {
  MongoUtils.createRecord(
    req.params.dbName,
    req.params.colName,
    req.body
  )
    .then((result) => { res.status(201).send({ insertedId: result.insertedId }); })
});

router.put("/databases/:dbName/collections/:colName/records/:recordId", (req, res) => {
  const objectID = new ObjectID(req.params.recordId);
  console.log(objectID);
  MongoUtils.updateRecord(
    req.params.dbName,
    req.params.colName,
    { _id: objectID },
    { $set: req.body }
  )
    .then((result) => { res.status(200).send({ result }); })
});

router.delete("/databases/:dbName/collections/:colName/records/:recordId", (req, res) => {
  const objectID = new ObjectID(req.params.recordId);
  MongoUtils.deleteRecord(
    req.params.dbName,
    req.params.colName,
    { _id: objectID }
  )
    .then(() => { res.status(204).send(); })
});

module.exports = router;
