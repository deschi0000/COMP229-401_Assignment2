let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// Get the Contacts Controller
let contactController = require('../controllers/contact');

// Get Route for the Game List page --  READ OPERATION
router.get('/', contactController.displayContactList);

// Get Route for the Add Page  --  CREATE OPERATION
router.get('/add', contactController.displayAddPage);

// Post Route for processing the Add page  --  CREATE OPERATION
router.post('/add', contactController.processAddPage);

// Get Route for displaying Edit Page  --  UPDATE OPERATION
router.get('/edit/:id', contactController.displayEditPage);

// Post Route for processing the Edit page  --  UPDATE OPERATION
router.post('/edit/:id', contactController.processEditPage);

// Get to perform Deletion  --  DELETE OPERATION
router.get('/delete/:id', contactController.performDelete);

module.exports = router;