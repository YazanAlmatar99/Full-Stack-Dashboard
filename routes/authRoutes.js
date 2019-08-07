const passport = require("passport");
const mongoose = require("mongoose");
const Horoscope = mongoose.model("horoscope");
const User = mongoose.model("users");
module.exports = app => {
  var userAuthorized = false;
  var userGoogleId = null;
  app.post("/auth/google/userAuth", async (req, res) => {
    console.log("************Data from the Client Side *************");
    console.log(req.user);

    res.send(req.user);
    await User.findOne({ googleId: req.user.googleId }, function(err, user) {
      if (err) {
        userAuthorized = false;
      }
      if (user) {
        console.log("this is the user from mongoooooooooooooo");
        console.log(user.googleId);
        userAuthorized = true;
        userGoogleId = user.googleId;
      }
    });
  });

  // app.get(
  //   "/auth/google",
  //   passport.authenticate("google", {
  //     scope: ["profile", "email"]
  //   })
  // );

  // app.get(
  //   "/auth/google/callback",
  //   passport.authenticate("google"),
  //   (req, res) => {
  //     res.redirect("/dashboard");
  //   }
  // );
  app.get("/api/logout", (req, res) => {
    req.logout();
    req.session = null;
    userAuthorized = false;
    res.redirect("/");
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
    console.log("**********req.user*********");
    console.log(req.user);
  });

  app.post("/api/v1/horoscope", async (req, res) => {
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
      res
        .status(406)
        .send({
          message: "error",
          ErrorDescription: "Wrong spelled or empty qName value!"
        });
    }
  });
  app.put("/api/v1/horoscope/:id", (req, res) => {
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
            res
              .status(401)
              .send({
                message: "error",
                ErrorDescription: "Please check the user ID!"
              });
          }
        }
      );
    } else {
      res
        .status(406)
        .send({
          message: "error",
          ErrorDescription: "Can't have completely empty query!"
        });
    }
  });
  app.delete("/api/v1/horoscope/:id", (req, res) => {
    console.log("***********w*authorized************");
    console.log(req.query["0"]);
    console.log(req);
    if (
      userAuthorized &&
      userGoogleId == req.query.googleId &&
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
