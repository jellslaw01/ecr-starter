const Router=require('express').Router();
const PostController=require('../controller/post');

Router.post('/create',PostController.create);
Router.get('/getAll',PostController.getAll);
Router.get('/getById/:postId',PostController.getById);
Router.delete('/delete/:postId',PostController.delete);

module.exports=Router;
