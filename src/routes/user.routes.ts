import app from "app";
import {Router} from "express"; 
import { token } from "morgan";
import {getAllUsers, getUser, updatePassword, deleteUser, getCoaches, getCoach} from '../controllers/user.controller'
import { TokenValidation } from '../middlewares/verifyToken'

const router = Router();

router.get('/all', TokenValidation, getAllUsers);
router.get('/:username', TokenValidation, getUser);
router.put('/update', TokenValidation, updatePassword) //Esta bien, pero igual es mejor hacer la comprobación en el cliente (?).
//router.post('/me', TokenValidation, updateMe); // Para actualizar nuestros datos, más adelante miramos qué campos poner.
router.delete('/:username',TokenValidation, deleteUser);
router.get('/coaches', TokenValidation, getCoaches);
router.get('/:usernameCoach', TokenValidation,getCoach);



export default router;