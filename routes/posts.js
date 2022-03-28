const Router=require('express').Router();
const postController=require('../controllers/postController');

Router.post('/',postController.createPost);
Router.put('/:id',postController.updatePost);
Router.delete('/:id',postController.deletePost);
Router.get('/:id',postController.getPost);
Router.get('/',postController.getPosts);

module.exports=Router;
