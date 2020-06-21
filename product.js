const express = require('express');
const { route } = require('.');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb+srv://anchoiha15:Truong123@cluster0-huizq.gcp.mongodb.net/test';
router.get("/", async (req, res) => {
    let client = await MongoClient.connect(url);
    let dbo = client.db("storesql");

    let result = await dbo.collection("vp_products").find({}).toArray();
    res.render("allProducts", { product: result });
});

router.get('/insert', (req, res)=>{
    res.render('insertProduct');
});

router.get('/delete', async (req, res)=>{
    let id = req.query.id;
    var ObjectId = require("mongodb").ObjectID;
    let condition = {_id: ObjectID(id)};
    let client = await MongoClient.connect(url);
    let dbo = client.db("storesql");
    await dbo.collection("vp_products").deleteOne(condition);

    let result = await dbo.collection("vp_products").find({}).toArray();
    res.render("allProduct", { product: result });
});

router.post("/doInsert", async (req, res) => {
    let client = await MongoClient.connect(url);
    let dbo = client.db("storesql");
    let name = req.body.name;
    let price = req.body.price;
    let id = req.body.id;
    let img = req.body.img;
    let note = req.body.note;
    let newProduct = {
        ProductId: id,
        ProductName: name,
        Image: img,
        Price: price,
        Note: note,
    };
    await dbo.collection("vp_products").insertOne(newProduct);

    let result = await dbo.collection("vp_products").find({}).toArray();
    res.render("allProduct", { product: result });
});

module.exports = router;