const mongoose = require('mongoose');

let categorySchema = mongoose.Schema({
    type: {
        type: String,
        required: true
    }
});
let CategoryObj = mongoose.model('Category', categorySchema);

module.exports={
    CategoryObj
};
