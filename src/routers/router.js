const express = require('express');
const controller = require('../controllers/controller'); // Import all controllers from ../controllers/controller.js
const User = require('../models/user.model');

const routes = express.Router(); // Create an instance of Express's Router


// Define routes and associate them with the appropriate controller function
routes.post('/signUp', controller.signUp); // Route to sign up a new user
routes.post('/login', controller.login); // Route to log in an existing user
routes.post('/user', controller.verify,async(req,res)=>{
    
    const {email,name,mobile}=await User.findById(req.decodedToken.userId)
    res.send({email,name,mobile})
}); // Route to log in an existing user
routes.put('/users', controller.verify, controller.update); // Route to update an existing user (requires authentication)

/* Routes for managing articles */
routes.get('/articles', controller.showArticles); // Route to show all articles (requires authentication)
routes.post('/articles/new', controller.verify, controller.createArticle); // Route to create a new article (requires authentication)
routes.put('/articles/:id', controller.verify, controller.updateArticle); // Route to update a specific article (requires authentication)
routes.delete('/articles/:id', controller.verify, controller.deleteArticle); // Route to delete a specific article (requires authentication)
routes.post('/users/myArticles', controller.verify, controller.myArticles); // Route to show all articles associated with a specific user (requires authentication)
module.exports = routes; // Export the Router object so it can be used in other files