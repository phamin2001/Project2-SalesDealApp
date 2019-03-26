const mongoose   = require('mongoose');
const Brand      = require('./brand');

const UserSchema = new mongoose.Schema({
    name:       {type: String, required: true},
    lastname:   {type: String},
    username:   {type: String, required: true, unique: true},
    password:   {type: String, required: true, unique: true},
    brands:     [Brand.schema]
});

module.exports = mongoose.model('User', UserSchema);