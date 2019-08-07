const mongoose = require('mongoose');


const Schema = mongoose.Schema;
const horoscopeSchema = new Schema({
   qName:String,
   qBirthDate: String,
   qBirthTime:String,
   qBirthPlace:String,
   qEmail:String,
   browser:String,
   utm_source:String,
   utm_medium:String,
   utm_compaign:String,
   utm_content:String
  });
  mongoose.model("horoscope", horoscopeSchema);
 
 