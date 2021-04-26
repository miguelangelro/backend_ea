import {Router} from 'express'
import { TokenValidation } from '../middlewares/verifyToken'
import upload from '../libs/multer'
import {getPost, getAllPosts, updatePost, deletePost, addPost} from '../controllers/post.controller'

const router = Router();



export default router;