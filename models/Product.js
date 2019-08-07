const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const productSchema = new Schema({
    id:String,
    product_id:String,
    title:String,
    product_type:String,
    variant_id:String,
    price:String,
    sku:String,
    variants:Object,
    image:String,
    updated_at:String
})
mongoose.model("products",productSchema)    

