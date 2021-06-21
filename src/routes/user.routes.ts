import app from "app";
import {Router} from "express"; 
import {getAllUsers, getUser,getFaq, updatePassword, deleteUser, updateUser, contactUs, agregarAmigo, dameUsuario} from '../controllers/user.controller'
import { TokenValidation } from '../middlewares/verifyToken'

const router = Router();

router.get('/all', TokenValidation, getAllUsers);
router.get('/faq', getFaq);
router.get('/:username', TokenValidation, getUser);
router.put('/update', TokenValidation, updatePassword) //Esta bien, pero igual es mejor hacer la comprobación en el cliente (?).
//router.post('/me', TokenValidation, updateMe); // Para actualizar nuestros datos, más adelante miramos qué campos poner.
router.delete('/:username',TokenValidation, deleteUser);
router.put('/updateuser', TokenValidation, updateUser );
router.post('/contactUs', contactUs);
router.post('/addAmigo',TokenValidation, agregarAmigo);
router.get('/dameUsuario/:id', TokenValidation, dameUsuario);


export default router;