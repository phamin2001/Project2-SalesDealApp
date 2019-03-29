const mongoose = require('mongoose');
const Brand    = require('./brand');

const DealSchema = new mongoose.Schema({
    percent    :    {type: Number, required: true},
    category   :    {type: String, required: true},
    // brands     :    [Brand.schema]
    brands     :    [{type: mongoose.Schema.Types.ObjectId, 
                      ref: 'Brand'}]
});

module.exports = mongoose.model('Deal', DealSchema);