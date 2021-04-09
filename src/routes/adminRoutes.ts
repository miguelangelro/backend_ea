import {Router} from "express"; 
import {getUsers, getUser,createUser, updateUser, deleteUser} from '../controllers/admin.controller'
import { TokenValidation } from '../middlewares/verifyToken'
import { adminValidation } from '../middlewares/adminValidator'

const router = Router();

router.get('/users',TokenValidation,adminValidation,getUsers);
router.get('/:id',TokenValidation,adminValidation,getUser);
router.post('/users',TokenValidation,adminValidation,createUser);
router.put('/:id',TokenValidation,adminValidation,updateUser);
router.delete('/:id',TokenValidation,adminValidation,deleteUser);


export default router;