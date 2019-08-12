const fetch = require("node-fetch");
const mongoose = require("mongoose");
const Inventory = mongoose.model("inventory");
const Product = mongoose.model("products");
const requireLogin = require('../middlewares/requireLogin')

const _ = require("lodash");
module.exports = app => {
  function sendBackArray(res, productsArray) {
    res.status(200).send({
      message: "ok",
      numberOfProducts: productsArray.length,
      data: productsArray
    });
    console.log("this should be the end");
  }
  async function sortProducts(product, todayDate, productsArray) {
    console.log("E");
    await Inventory.findOne({ id: product.id, date: todayDate }).then(
      inventory => {
        console.log("F");
        product.updated_date = inventory.date;
        for (var i = 0; i < inventory.variants.length; i++) {
          console.log("inside loop");
          product.variants[i].inventory_quantity =
            inventory.variants[i].inventory_quantity;
        }
        productsArray.push(product);

        console.log("G");
        return product;
      }
    );
    console.log("-");
  }
  async function mapProducts(products, todayDate, productsArray, res) {
    console.log("D");
    const promises = await products.map(async product => {
      await sortProducts(product, todayDate, productsArray);
    });
    const results = await Promise.all(promises).then(() => {
      sendBackArray(res, productsArray);
    });

    console.log("H");
  }

  function sendBack(products, todayDate, productsArray, res) {
    console.log("C");
    mapProducts(products, todayDate, productsArray, res);
    console.log("I");
  }
  app.get("/api/v1/inventory", requireLogin,(req, res) => {
    var todayDate = "";
    var productsArray = [];
    var tempArray = [];
    Inventory.find()
      .sort([["date", -1]])
      .exec()
      .then(docs => {
        console.log("A");
        todayDate = docs[0].date;
        Product.find({}).then(products => {
          console.log("B");
          sendBack(products, todayDate, productsArray, res);
        });
      });
    console.log("1");
  });
  app.get("/api/v1/inventory/:id",requireLogin, (req, res) => {
    const requestId = req.params.id;
    Product.aggregate([
      {
        $match: {
          id: requestId
        }
      },
      {
        $lookup: {
          from: "inventories", // collection name in db
          localField: "id",
          foreignField: "id",
          as: "inventory"
        }
      }
    ]).exec(function(err, products) {
      var productsObject = products;
      res.send(productsObject);
    });
  });
  app.get("/api/v1/inventory/date/:date",requireLogin, (req, res) => {
    // date = yyyy-mm-dd
    const fullDate = req.params.date;
    var productsArray = [];
    console.log("A");
    Product.find({}).then(products => {
      console.log("B");
      sendBackDate(products, fullDate, productsArray, res);
    });

    console.log("1");

    //--------------------------------------------------------------

    function sendBackArrayDate(res, productsArray) {
      res.status(200).send({
        message: "ok",
        numberOfProducts: productsArray.length,
        data: productsArray
      });
      console.log("this should be the end");
    }
    async function sortProductsDate(product, fullDate, productsArray) {
      console.log("E");
      await Inventory.findOne({
        id: product.id,
        date: { $regex: `${fullDate}T*` }
      }).then(inventory => {
        product.updated_date = inventory.date;
        for (var i = 0; i < inventory.variants.length; i++) {
          console.log("inside loop");
          product.variants[i].inventory_quantity =
            inventory.variants[i].inventory_quantity;
        }
        productsArray.push(product);

        console.log("G");
        return product;
      });
      console.log("-");
    }
    async function mapProductsDate(products, fullDate, productsArray, res) {
      console.log("D");

      const promises = await products.map(async product => {
        await sortProductsDate(product, fullDate, productsArray);
      });
      const results = await Promise.all(promises).then(() => {
        sendBackArrayDate(res, productsArray);
      });

      console.log("H");
    }

    function sendBackDate(products, fullDate, productsArray, res) {
      console.log("C");
      mapProductsDate(products, fullDate, productsArray, res);
      console.log("I");
    }
  });

  app.get("/api/v1/inventory/:id/:date",requireLogin, (req, res) => {
    const requestId = req.params.id;
    console.log(requestId);
    const requestedDate = req.params.date;
    console.log("A");
    Product.findOne({ id: requestId })
      .then(async product => {
        console.log("B");
        await Inventory.findOne({
          id: product.id,
          date: { $regex: `${requestedDate}T*` }
        }).then(inventory => {
          console.log("C");
          product.updated_date = inventory.date;
          for (var i = 0; i < inventory.variants.length; i++) {
            console.log("inside loop");
            product.variants[i].inventory_quantity =
              inventory.variants[i].inventory_quantity;
          }
          console.log("D");
        });
        return product;
      })
      .then(product => {
        console.log("E");
        res.send(product);
        console.log("this should be the end");
      });
  });

  app.delete('/api/inventory/:date',(req,res)=>{
    const dateToDelete = req.params.date;
    Inventory.find({date:dateToDelete}).remove((error,doc)=>{
      res.status(200).send({message:"ok"})
    })
  })
  
};
