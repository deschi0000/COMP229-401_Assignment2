let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// Connect to our game model
let Contact = require('../modules/contact');

// Get Route for the Game List page
router.get('/', async (req, res, next) => {
    try {
        let contactList = await Contact.find();
        // console.log(contactList);

        res.render('contactlist', {
            title: 'Contacts',
            ContactList: contactList
        });
    } catch (err){
        console.log(err);
    }
});

module.exports = router;