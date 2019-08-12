const mongoose = require('mongoose')
const Schema = mongoose.Schema
const influencerSchema = new Schema({
    id:String,
    name:String,
    yt_channel:String,
    instagram:String,
    email:String,
    items:Object,
    discount_codes:Object,
    creation_date:String
})
mongoose.model('influencer',influencerSchema)