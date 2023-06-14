let mongoose = require('mongoose');

// Create a model class
let contactModel = mongoose.Schema({
    lastname: String,
    firstname: String,
    contactnumber: Number,
    email: String
},
{
    collection: 'contacts'
});

module.exports = mongoose.model('Contact', contactModel);