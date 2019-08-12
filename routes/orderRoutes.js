const mongoose = require("mongoose");
const Order = mongoose.model("order");
const Influencer = mongoose.model("influencer");
const Product = mongoose.model("products");
module.exports = app => {
  app.post("/api/cocreation", (req, res) => {
    console.log(req.body.line_items);
    //const discountCode = req.discount_applications.discountCode;
    var lineItemsArr = [];
    req.body.line_items.map(line_item => {
      lineItemsArr.push({
        id: line_item.id,
        variant_id: line_item.variant_id,
        title: line_item.title,
        quantity: line_item.quantity,
        price: line_item.price,
        sku: line_item.sku
      });
    });
    const order = new Order({
      id: req.body.id,
      email: req.body.email,
      created_at: req.body.created_at,
      updated_at: req.body.updated_at,
      note: req.body.note,
      line_items: lineItemsArr,
      discount_codes: req.body.discount_codes,
      total_price: req.body.total_price
    }).save((error, doc) => {
      if (error) {
        console.log(error);
      } else {
        console.log(doc);
      }
    });
  });

  app.get("/api/cocreation/:name", (req, res) => {
    async function handleData(influencer) {
      const promise = await influencer.items.map(async item => {
        await mapItems(item);
      });
      const result = await Promise.all(promise).catch(error => {
        console.log(error);
      });
    }
    async function mapItems(item) {
      // influencer.items.map(item => {
      console.log("----3----");
      await Product.findOne({ id: item.id_items })
        .then(product => {
          console.log("----4----");
          //console.log(product)
          var prdct = {
            id: product.id,
            title: product.title,
            product_type: product.product_type,
            image: product.image,
            varints: product.varints,
            share_revenue: item.share_revenue
          };
          // console.log(prdct)
          return prdct;
        })
        .then(prdct => {
          console.log("----5----");
          // console.log(prdct)
          itemsArr.push(prdct);
        });

      // });

      return true;
    }
    function sendBackArr(itemsArr) {
      console.log("6");

      res.send(itemsArr);
    }
    const influencerName = req.params.name;
    console.log("----1----");
    var itemsArr = [];
    Influencer.findOne({ name: influencerName }).then(
      async (influencer, error) => {
        var items = {
          id_items: "1768373452842",
          share_revenue: "0"
        };
        var items2 = {
          id_items: "1768363982890",
          share_revenue: "0"
        };
        influencer.items.push(items);
        influencer.items.push(items2);

        //console.log(influencer.items)
        if (influencer) {
          console.log("----2----");

          await handleData(influencer);
          // .then(() => {
          await sendBackArr(itemsArr);
          console.log("this should be reached");
          // })
        }
      }
    );
  });

  app.get("/api/cocreation/:name/:id", (req, res) => {
    const influencerName = req.params.name;
    console.log(influencerName);
    const productId = parseInt(req.params.id);
    console.log("A");
    Influencer.find({ name: influencerName }).then(influencer => {
      console.log("B");
      Order.find({ "line_items.id": productId })
        .then(orders => {
          console.log("C");
          console.log(orders)
          var theInfluencer = influencer
          theInfluencer.orders = orders;
          console.log(theInfluencer)
          return theInfluencer;
        })
        .then(inf => {
          console.log("D");
          console.log(inf)
          res.send(inf);
        });
    });
  });
};
