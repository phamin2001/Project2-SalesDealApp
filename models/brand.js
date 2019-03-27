const mongoose = require('mongoose');
const Deal     = require('./deal');

const BrandSchema = new mongoose.Schema({
    name:      {type: String, required: true},
    category:  {type: String},
    deals:     [Deal.schema]
});

module.exports = mongoose.model('Brand', BrandSchema);