let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// Connect to our game model
let Contact = require('../models/contact');

// Get Route for the Game List page --  READ OPERATION
router.get('/', async (req, res, next) => {
    try {
        let contactList = await Contact.find();
        // console.log(contactList);

        res.render('contacts/list', {
            title: 'Contacts',
            ContactList: contactList
        });
    } catch (err){
        console.log(err);
    }
});

// Get Route for the Add Page  --  CREATE OPERATION
router.get('/add', async (req, res, next) => {
    try {
        res.render('contacts/add', {title: 'Add a Contact'});
    } catch (err){
        console.log(err);
    }
});



// Post Route for processing the Add page  --  CREATE OPERATION
router.post('/add', async (req, res, next) => {

    let newContact = new Contact({
        "lastname":req.body.lastname,
        "firstname":req.body.firstname,
        "contactnumber":req.body.contactnumber,
        "email":req.body.email
    })

    try {
        await newContact.save();
        res.redirect('/contact-list');
    } catch(err) {
        console.log(err);
        res.status(500).send(err);
    }
});


// Get Route for displaying Edit Page  --  UPDATE OPERATION
router.get('/edit/:id', async (req, res, next) => {
    
    let id = req.params.id;

    try {
        let contactToEdit = await Contact.findById(id);
        res.render('contacts/edit', {title: 'Edit Contact', contact: contactToEdit});
    } catch(err) {
        console.log(err);
        res.status(500).send(err);
    }
});


// Post Route for processing the Edit page  --  UPDATE OPERATION
router.post('/edit/:id', async (req, res, next) => {
    
    let id = req.params.id;

    let updatedContact = {
        "lastname":req.body.lastname,
        "firstname":req.body.firstname,
        "contactnumber":req.body.contactnumber,
        "email":req.body.email
    }

    try {
        await Contact.updateOne({_id: id}, updatedContact);
        res.redirect('/contact-list')
    } catch(err) {
        console.log(err);
        res.status(500).send(err);
    }
});


// Get to perform Deletion  --  DELETE OPERATION
router.get('/delete/:id', async (req, res, next) => {
    let id = req.params.id;

    try {
        await Contact.findByIdAndRemove(id);
        res.redirect('/contact-list');
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});











module.exports = router;