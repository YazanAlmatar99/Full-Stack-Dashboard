const mongoose = require('mongoose');
const Schema = mongoose.Schema
const inventorySchema = new Schema({
    id:String,
    date:String,
    variants:Object,
    product_id:String,
    title:String

})
mongoose.model('inventory',inventorySchema)