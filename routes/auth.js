const Router=require('express').Router();
const authController=require('../controllers/authController');
//register

Router.post('/register',authController.register);

//login

Router.post('/login',authController.login);

module.exports=Router;