module.exports = app => {
  const mongoose = require("mongoose");
  const requireLogin = require('../middlewares/requireLogin')
  const Horoscope = mongoose.model("horoscope");
  const cors = require('cors')
  var whitelist = ['https://sleepy-cove-91820.herokuapp.com/']
  var corsOptions = {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  }
  app.post("/api/v1/horoscope",async (req, res) => {
    if (req.query.qName) {
      console.log(
        req.query.qName,
        "*********************************************************"
      );
      var horoscope = new Horoscope({
        qName: req.query.qName,
        qBirthDate: "",
        qBirthTime: "",
        qBirthPlace: "",
        qEmail: "",
        browser: "",
        utm_source: "",
        tm_medium: "",
        utm_compaign: "",
        utm_content: ""
      });
      await horoscope.save(function(err, data) {
        if (err) {
          console.log(err);
          res.status(404).send({ message: "error", ErrorDescription: err });
        } else {
          res.status(200).send({ message: "ok", userID: data.id });
        }
        console.log(data);
      });
    } else {
      res.status(406).send({
        message: "error",
        ErrorDescription: "Wrong spelled or empty qName value!"
      });
    }
  });

  app.put("/api/v1/horoscope/:id", cors(corsOptions),(req, res) => {
    console.log(
      "***************this is the data from the put request****************"
    );
    console.log(req.query);
    console.log("*********************");
    if (Object.keys(req.query).length) {
      Horoscope.findByIdAndUpdate(
        req.params.id,
        req.query,
        { new: true },
        (err, userData) => {
          if (userData) {
            res.status(200).send({ message: "ok", data: { userData } });
            console.log(userData);
          } else if (err) {
            res.status(401).send({
              message: "error",
              ErrorDescription: "Please check the user ID!"
            });
          }
        }
      );
    } else {
      res.status(406).send({
        message: "error",
        ErrorDescription: "Can't have completely empty query!"
      });
    }
  });

  app.delete("/api/v1/horoscope/:id",cors(corsOptions),requireLogin, (req, res) => {
    console.log("***********w*authorized************");
    console.log(req.query["0"]);
    console.log(req);
    if (
    //   userAuthorized &&
    //   userGoogleId == req.query.googleId &&
      req.query.role == "admin"
    ) {
      Horoscope.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
          console.log("==============deleting error==================");
          console.log(error);
          res.status(400).send({ message: "error", ErrorDescription: error });
        } else {
          res.status(200).send({ message: "ok", deletedID: req.params.id });
        }
      });
    } else {
      res
        .status(401)
        .send({ message: "error", ErrorDescription: "Unauthorized" });
    }
  });
};
