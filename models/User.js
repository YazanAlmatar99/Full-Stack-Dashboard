const mongoose = require('mongoose');


const Schema = mongoose.Schema;
const userSchema = new Schema({
    googleId: String,
    firstName: String,
    lastName: String,
    picture: String,
    email: String,
    hd: String,
    role:String
  });
  mongoose.model("users", userSchema);
 