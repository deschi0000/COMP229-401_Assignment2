let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// Get the Contacts Controller
let contactController = require('../controllers/contact');

// Passport Support
let passport = require('passport');

// Helper function for guard purposes
function requireAuth(req, res, next) {
    
    // Check if the user is logged in
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
}

// Get Route for the Game List page --  READ OPERATION
router.get('/', contactController.displayContactList);

// Get Route for the Add Page  --  CREATE OPERATION
router.get('/add', requireAuth, contactController.displayAddPage);

// Post Route for processing the Add page  --  CREATE OPERATION
router.post('/add', requireAuth, contactController.processAddPage);

// Get Route for displaying Edit Page  --  UPDATE OPERATION
router.get('/edit/:id', requireAuth, contactController.displayEditPage);

// Post Route for processing the Edit page  --  UPDATE OPERATION
router.post('/edit/:id', requireAuth, contactController.processEditPage);

// Get to perform Deletion  --  DELETE OPERATION
router.get('/delete/:id', requireAuth, contactController.performDelete);

module.exports = router;