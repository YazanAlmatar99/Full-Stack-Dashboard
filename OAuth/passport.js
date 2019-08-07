const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const mongoose = require("mongoose");
const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      //proxy : true - will make heroku trust the request http => https to prevent having a conflict with google redirect url
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("***********acessToken***");
      console.log(accessToken);
      console.log("***********refreshToken***");
      console.log(refreshToken);
      console.log("***********profile***");
      console.log(profile);
      console.log("***********done***");
      console.log(done);
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        console.log('***********existing User**************')
        done(null, existingUser);
      } else { 
        const user = await new User({
          googleId: profile.id,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          picture: profile.photos[0].value,
          email: profile.emails[0].value,
          hd: profile["_json"].hd,
          role:"admin"
        }).save();
        console.log('***********User**************')
        console.log(user)
        done(null, user);
      }
    }
  )
);

