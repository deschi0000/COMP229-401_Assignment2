// Dave von Deschwanden - 301303220 - 16.06.2023

let express = require('express');
let router = express.Router();

// Get the Controller
let indexController = require('../controllers/index');
  

// GET Home page.
router.get('/', indexController.displayHomePage);

// GET Home page.
router.get('/home', indexController.displayHomePage);

// GET About Us page.
router.get('/about', indexController.displayAboutPage);

// GET Products page.
router.get('/products', indexController.displayProductsPage);

// GET Services page.
router.get('/services', indexController.displayServicesPage);

// GET Contact Us page.
router.get('/contact', indexController.displayContactUsPage);

// POST Contact Us page. 
router.post('/contact', indexController.postContactUsPage);



// GET Route for displaying the Login Page
router.get('/login', indexController.displayLoginPage);

// POST Route for processing the Login Page
router.post('/login', indexController.processLoginPage);

// GET Route for displaying the Register Page
router.get('/register', indexController.displayRegisterPage);

// POST Route for displaying the Register Page
router.post('/register', indexController.processRegisterPage);

// GET to perform UserLogout
router.get('/logout', indexController.performLogout);

module.exports = router;
