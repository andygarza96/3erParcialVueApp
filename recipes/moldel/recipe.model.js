const mongoose = require('mongoose');

let RecipeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: 'unknown'
    },
    description: {
        type: String
    },
    category: {
        // Array of strings
        type: [String],
        required: true,
        enum: [
            'Breakfast',
            'Lunch',
            'Dinner',
            'Snacks',
            'Desserts',
            'Drinks'
        ]
    },
    image: {
        type: String
    },
    ingredients: {
        type: [String],
        required: true,
        default: 'unknown'
    },
    instuctions: {
        type: Array,
        required: true,
        default: 'unknown'
    },
    coments: {
        // Array of strings
        type: [String],
        required: false
    }

});
let RecipeModel = mongoose.model('Recipe', RecipeSchema);

module.exports = {
    RecipeModel
};