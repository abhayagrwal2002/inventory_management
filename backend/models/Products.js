const mongoose = require('mongoose');
const { Schema } = mongoose;


const ProductsSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        default:"general"
    },
    date:{
        type:Date,
        default:Date.now
    }

})

module.exports = mongoose.model("products",ProductsSchema)