let express = require("express");
let router = express.Router();
let MongoUtils = require("../db/MongoUtils.js");

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

module.exports = router;
