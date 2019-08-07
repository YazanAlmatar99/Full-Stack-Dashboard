const mongoose = require('mongoose');
const Schema = mongoose.Schema
const inventorySchema = new Schema({
    id:String,
    date:String,
    variants:Object,
    product_id:String,
    cost_per_item:String,
    inventory_quantity:String

})
mongoose.model('inventory',inventorySchema)