const Router=require('express').Router();
const categoryController=require('../controllers/categoryController');

Router.post('/',categoryController.postCategory);
Router.get('/',categoryController.getCategory);

module.exports=Router;