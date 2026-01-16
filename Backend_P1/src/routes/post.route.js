import {Router} from "express";
import {createPost, getAllPost,updatePost,deletePost} from './controllers/post.controller.js';

const router = Router();

router.route('/createposts').post(createPost);
router.route('/allposts').get(getAllPost);
router.route('/updateposts/:id').patch(updatePost); // Update post route to be implemented
router.route('/deleteposts/:id').delete(deletePost); // Delete post route to be implemented

export default router;  