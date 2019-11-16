const mongoose = require('mongoose');

let recipeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: 'unknown'
    }, 
    description:{
        type:String
    },
    type: {
        type: mongoose.Schema.ObjectId,
        ref:'Category',
        required: true
    },
    image: {
        type:String
    },
    ingredientes: {
        type: Array,
        required: true,
        default: 'unknown'
    },
    procedimiento: {
        type: Array,
        required: true,
        default: 'unknown'
    }

});
let recipeObj = mongoose.model('Recipe', recipeSchema, 'Recipes');

module.exports={
    recipeObj
};
