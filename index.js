const express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://anchoiha15:Truong123@cluster0-huizq.gcp.mongodb.net/test"

router.get('/', async (req, res) => {
    let client = await MongoClient.connect(url);
    let dbo = client.db("storesql");

    let result = await dbo.collection("vp_products").find({}).toArray();
    res.render("index", { product: result });
});

module.exports = router;