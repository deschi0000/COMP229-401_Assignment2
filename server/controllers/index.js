// Dave von Deschwanden - 301303220 - 06.2023
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

// create the User Model Instance
let userModel = require('../models/user');
let User = userModel.User;  // alias

/* GET Home page. */
module.exports.displayHomePage = (req, res, next) => {
    // If there is a param in the query, then display thank you message
    if (req.query.param1){
        let param1 = req.query.param1;
        console.log(param1);

        res.render('indexmsg', { 
            title: 'Home', 
            message: 'Thank You', 
            displayName: req.user ? req.user.displayName : ''
        });

    }
    res.render('index', { title: 'Home', displayName: req.user ? req.user.displayName : ''});
}

/* GET About Us page. */
module.exports.displayAboutPage = (req, res, next) => {
    res.render('index', { title: 'About', displayName: req.user ? req.user.displayName : ''});
}

/* GET Products page. */
module.exports.displayProductsPage = (req, res, next) => {
    res.render('index', { title: 'Products', displayName: req.user ? req.user.displayName : ''});
}

/* GET Services page. */
module.exports.displayServicesPage = (req, res, next) => {
    res.render('index', { title: 'Services', displayName: req.user ? req.user.displayName : ''});
}

/* GET Contact Us page. */
module.exports.displayContactUsPage = (req, res, next) => {
    res.render('contact', { title: 'Contact', displayName: req.user ? req.user.displayName : ''});
}

/* POST Contact Us page. */
module.exports.postContactUsPage = (req, res, next) =>  {

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
  }

module.exports.displayLoginPage = (req, res, next) => {
    // check if the user is already logged in
    if(!req.user){
        res.render('auth/login', {
            title: "Login",
            messages: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName : ''
        });

    } else {
        return res.redirect('/');
    }
}

module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate('local',
    (err, user, info) => {
        // server err?
        if(err) {
            return next(err);
        }
        // user login err?
        if(!user){
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/login');
        }
        // no issues~~
        req.login(user, (err) => {
            // check for error again (server disconnect/error/etc)
            if(err) {
                return next(err);
            }
            return res.redirect('/contact-list');
        });
    })(req, res, next);
}

module.exports.displayRegisterPage = (req, res, next) => {
    // check if the user is not already logged in
    if(!req.user){
        res.render('auth/register', {
            title: "Register",
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName : ''
        });

    } else {
        return res.redirect('/');
    }
}

module.exports.processRegisterPage = (req, res, next) => {
    // initialize a user object
    let newUser = new User({
        username: req.body.username,
        email: req.body.email,
        displayName: req.body.displayName
    });

    User.register(newUser, req.body.password, (err) => {
        if (err) {
            console.log(err);
            if (err.name == 'UserExistsError') {
                req.flash(
                    'registerMessage',
                    'Registration Error: User Already Exists!'
                ); 
                console.log("Error: User Already Exists!");
            }
            return res.render('auth/register',
            {
                title:"Register",
                messages: req.flash('registerMessage'),
                displayName: req.user ? req.user.displayName : ''
            });
        } else {
            // if registration is successful
            return passport.authenticate('local')(req, res, () => {
                res.redirect('/contact-list')
            });
        }
    });
}

module.exports.performLogout = (req, res, next) => {
    req.logout((err) => {
        if (err){
            // handle err
            console.log(err);
            return next(err);
        }
        return res.redirect('/');
    });
}
