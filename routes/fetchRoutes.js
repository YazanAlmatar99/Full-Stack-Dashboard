const fetch = require("node-fetch");
const mongoose = require("mongoose");
const Product = mongoose.model("products");
const Inventory = mongoose.model("inventory");
const keys = require("../config/keys");
module.exports = app => {

  async function storeProduct(product,res) {
    const existingProduct = await Product.findOne({ id: product.id })
      .then(existingProduct => {
        if (!existingProduct) {
          var theVariants = [];
          product.variants.map(variant => {
            theVariants.push({
              id: variant.id,
              price: variant.price,
              sku: variant.sku,
              product_id: product.id,
              cost_per_item: ""
            });
          });
          const productInfo = new Product({
            id: product.id,
            product_id: product.product_id,
            title: product.title,
            product_type: product.product_type,
            image: product.images[0].src || "",
            updated_at: product.updated_at,
            variants: theVariants
          })
            .save()
            .then(data => {});
        } else {
          Product.findOne({ id: product.id }).then((data, error) => {
            console.log("the product is already there (products)");
            if (product.updated_at != data.updated_at) {
              Product.findByIdAndUpdate(product["_id"], product, () => {});
            } else {
              console.log("this product has not been updated");
              console.log(product.title);
            }
          });
        }
      })
      .catch(error => {
        res.send({message:'error', errorDescription:error})
      });
  }

  async function storeInventory(product,res,dateTime) {
    var theVariants = [];
    product.variants.map(variant => {
      theVariants.push({
        id: variant.id,
        product_id: product.id,
        inventory_quantity: variant.inventory_quantity
      });
    });

    const productInfo = new Inventory({
      id: product.id,
      date: dateTime,
      product_id: product.product_id,
      variants: theVariants
    }).save((error,user)=>{
      if(error){
        res.send(error)
      }
    });
  }

  async function addToDB(res, page, allProducts,dateTime) {
    fetch(
      `https://${keys.analuisaApiKey}@analuisaparis.myshopify.com/admin/products.json?limit=250&page=${page}`
    )
      .then(data => data.json())
      .then(json => {
        allProducts = allProducts.concat(json.products);
        return json.products;
      })
      .then(products => {
        if (products.length != 0) {
          page = page + 1;
          addToDB(res, page, allProducts,dateTime);
        } else {
          return true;
        }
      })
      .then(finished => {
        if (finished) {
          allProducts.map(product => {
            storeProduct(product,res);
            storeInventory(product,res,dateTime);
          });
        }
      })
      .catch(error => {
        res.status(404).send({ message: error });
      });
  }
  app.post("/api/v1/inventory", async (req, res) => {
    var dateTime = new Date().toISOString(); 

    if (req.query.analuisa_secret === keys.googleTriggerKey) {
      var page;
      page = 1;
      var allProducts = [];

      await addToDB(res, page, allProducts,dateTime);
      await res.send({ message: "ok" });
    } else {
      res.status(401).send({ message: "unauthorized" });
    }
  });
};
