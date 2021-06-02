import app from "app";
import {Router} from "express"; 
import {getAllUsers, getUser, updatePassword, deleteUser, updateUser, contactUs, deleteUserId, updateUserGym } from '../controllers/user.controller'
import { TokenValidation } from '../middlewares/verifyToken'
import { adminValidation } from '../middlewares/adminValidator'

const router = Router();

router.get('/all', TokenValidation, getAllUsers);
router.get('/:username', TokenValidation, getUser);
router.put('/update', TokenValidation, updatePassword) //Esta bien, pero igual es mejor hacer la comprobación en el cliente (?).
//router.post('/me', TokenValidation, updateMe); // Para actualizar nuestros datos, más adelante miramos qué campos poner.
router.delete('/:username',TokenValidation, deleteUser);
router.put('/updateuser', TokenValidation, updateUser );
router.post('/contactUs', contactUs);
router.delete('/delete/:id',TokenValidation, deleteUserId);
router.put('/update/updateuser/:id', TokenValidation, adminValidation, updateUserGym );

export default router;