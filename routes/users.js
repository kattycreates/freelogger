
const Router=require('express').Router();
const userController=require('../controllers/userController');

Router.put('/:id',userController.updateUser);
Router.delete('/:id',userController.deleteUser);
Router.get('/:id',userController.getUser);

module.exports=Router;
