// Dave von Deschwanden - 301303220 - 06.2023
let express = require('express');
let router = express.Router();

/* GET Home page. */
router.get('/', (req, res, next) =>  {
   
  // If there is a param in the query, then display thank you message
  if (req.query.param1){
    let param1 = req.query.param1;
    console.log(param1);

    res.render('index', { title: 'Home', message: 'Thank You'});

  }
  res.render('index', { title: 'Home', message: ""});

});

/* GET Home page. */
router.get('/home', (req, res, next) =>  {
  res.render('index', { title: 'Home', message: ""});
});

/* GET About Us page. */
router.get('/about', (req, res, next) =>  {
  res.render('index', { title: 'About', message: ""});
});

/* GET Products page. */
router.get('/products', (req, res, next) =>  {
  res.render('index', { title: 'Products', message: ""});
});

/* GET Services page. */
router.get('/services', (req, res, next) =>  {
  res.render('index', { title: 'Services', message: ""});
});

/* GET Contact Us page. */
// Use a different template as per 1.i.

router.get('/contact', (req, res, next) =>  {
  res.render('contact', { title: 'Contact', message: ""});
});

/* POST Contact Us page. */
router.post('/contact', (req, res, next) =>  {

  // Grab the fields from the post
  let postFirst = req.body.first;
  let postLast = req.body.last;
  let postEmail = req.body.email;
  let postMessage = req.body.message;

  // Demonstrating how the fields can be stored in JSON (event. a database) 
  let formObject = {
    firstName: postFirst,
    lastName: postLast,
    email : postEmail,
    message: postMessage
  };
  console.log(formObject);

  // Send a parameter with the redirect, to display message  
  param1 = "thankyou"

  res.redirect(`/?param1=${param1}`);
});


module.exports = router;
