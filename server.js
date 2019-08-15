const express = require('express');
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const cookieParser = require('cookie-parser');
const passport = require("passport");
const bodyParser = require('body-parser');
const keys = require('./config/keys')
const path = require('path');
const cors = require('cors')
require("./models/User");
require("./models/Horoscope");
require("./models/Product");
require("./models/Inventory");
require("./OAuth/passport");
require("./models/Order");
require("./models/Influencer");
const app = express();
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, auth');
  res.header('Access-Control-Allow-Credentials', 'true');
  if ('OPTIONS' == req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
});


app.use(
    cookieSession({
      maxAge: 30 * 24 * 60 * 60 * 1000,
      keys: [keys.cookieKey]
    })
  );

app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API calls
app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
    
  // Handle React routing, return all requests to React app
  app.get('/a/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
 
}
mongoose.set('useFindAndModify', false);
mongoose.connect(keys.mongoURI,{useNewUrlParser: true});
require("./routes/fetchRoutes")(app);
require("./routes/authRoutes")(app);
require("./routes/inventoryRoutes")(app);
require("./routes/horoscopeRoutes")(app);
require("./routes/orderRoutes")(app);


app.listen(port, () => console.log(`Listening on port ${port}`));