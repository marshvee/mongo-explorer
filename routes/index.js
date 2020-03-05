let express = require("express");
let router = express.Router();
let MongoUtils = require("../db/MongoUtils.js");

/* GET home page. */
router.get("/", function (req, res) {
  let db = MongoUtils.getDbs()
    .then(dbs => { res.render("index", { dbs: dbs.databases }); })
});

module.exports = router;
