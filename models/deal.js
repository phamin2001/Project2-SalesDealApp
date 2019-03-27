const mongoose = require('mongoose');
const Brand    = require('./brand');

const DealSchema = new mongoose.Schema({
    percent:    {type: Number, required: true},
    category:   {type: String, required: true},
    brands:     [Brand.schema]
    // brand: {type: String, required: true}

});

module.exports = mongoose.model('Deal', DealSchema);