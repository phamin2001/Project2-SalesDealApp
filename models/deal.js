const mongoose = require('mongoose');

const DealSchema = new mongoose.Schema({
    percent:  {type: Number, required: true}
});

module.exports = mongoose.model('Deal', DealSchema);