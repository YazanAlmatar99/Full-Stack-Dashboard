const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const orderSchema = new Schema({
    id:String,
    email:String,
    created_at:String,
    updated_at:String,
    note:String,
    line_items:Object,
    total_price:String,
    discount_codes:Object
})
mongoose.model('order',orderSchema)