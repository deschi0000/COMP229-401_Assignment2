let mongoose = require('mongoose');

// Create a model class
let contactModel = mongoose.Schema({
    lastname: String,
    firstname: String,
    contactnumber: Number,
    email: String
},
{
    collection: 'contact_list'
});

module.exports = mongoose.model('Contact', contactModel);