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
  console.log(req.params.dbName);
  MongoUtils.getCollections(req.params.dbName)
    .then(cols => { res.send(cols); })
});

module.exports = router;
