let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// Connect to our game model
let Contact = require('../models/contact');

// Get Route for the Game List page --  READ OPERATION
module.exports.displayContactList = async (req, res, next) => {
    try {
        
        let contactList = await Contact.find().sort({lastname: 1}); // sort in alphabetical order by last name
        // let contactList = await Contact.find();
        // console.log(contactList);

        res.render('contacts/list', {
            title: 'Contacts',
            ContactList: contactList,
            displayName: req.user ? req.user.displayName : ''
        });
    } catch (err){
        console.log(err);
    }
}

// Get Route for the Add Page  --  CREATE OPERATION
module.exports.displayAddPage = async (req, res, next) => {
    try {
        res.render('contacts/add', {
            title: 'Add a Contact',
            displayName: req.user ? req.user.displayName : ''
        });
    } catch (err){
        console.log(err);
    }
}

// Post Route for processing the Add page  --  CREATE OPERATION
module.exports.processAddPage = async (req, res, next) => {

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
}

// Get Route for displaying Edit Page  --  UPDATE OPERATION
module.exports.displayEditPage = async (req, res, next) => {
    
    let id = req.params.id;

    try {
        let contactToEdit = await Contact.findById(id);
        res.render('contacts/edit', {
            title: 'Edit Contact', 
            contact: contactToEdit,
            displayName: req.user ? req.user.displayName : ''
        });
    } catch(err) {
        console.log(err);
        res.status(500).send(err);
    }
}

// Post Route for processing the Edit page  --  UPDATE OPERATION
module.exports.processEditPage = async (req, res, next) => {
    
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
}

// Get to perform Deletion  --  DELETE OPERATION
module.exports.performDelete = async (req, res, next) => {
    let id = req.params.id;

    try {
        await Contact.findByIdAndRemove(id);
        res.redirect('/contact-list');
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}
