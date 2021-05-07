import { Router } from 'express';
const router = Router();

import { signup, signin, profile, getMe } from '../controllers/auth.controller'
import { TokenValidation } from '../middlewares/verifyToken'

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/profile', TokenValidation, profile)
router.get('/me',TokenValidation, getMe);

export default router;