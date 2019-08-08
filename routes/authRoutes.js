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

  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/a/dashboard");
    }
  );
  app.get("/auth/logout", (req, res) => {
    req.logout();
    req.session = null;
    userAuthorized = false;
    res.redirect("/");
  });

  app.get("/auth/current_user", (req, res) => {
    res.send(req.user);
    console.log("**********req.user*********");
    console.log(req.user);
  });
};
