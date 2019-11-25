//this is the model of a recipe
const mongoose = require('mongoose');

const RecipeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: 'unknown'
    },
    description: {
        type: String,
        required: true
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
    },
    instructions: {
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
const RecipeModel = mongoose.model('Recipe', RecipeSchema);

module.exports = RecipeModel;