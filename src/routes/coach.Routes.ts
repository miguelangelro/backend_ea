import {Router} from 'express';
import {getUsers, getUser} from '../controllers/coach.controller'
import { TokenValidation } from '../middlewares/verifyToken'
import { coachValidation } from '../middlewares/coachValidator'
import { adminValidation } from 'middlewares/adminValidator';
import user from 'models/user';

const router = Router();

router.get('/users', TokenValidation, coachValidation, getUsers);
router.get('/:id', TokenValidation, coachValidation, getUser);


export default router;