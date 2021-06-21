import app from "app";
import {Router} from "express"; 
import { adminValidation } from "../middlewares/adminValidator";
import {getAllUsers, getUser, updatePassword, deleteUser} from '../controllers/user.controller'
import {postusuario, getpostusuario, uploadfiles, getimagen} from '../controllers/postusuarios.controller'
import { TokenValidation } from '../middlewares/verifyToken'

const router = Router();
router.post('/',TokenValidation,postusuario);

router.get('/',TokenValidation,getpostusuario)

//Ruta para subir archivos
router.post('/upload', TokenValidation, uploadfiles);
router.get('/imagen/:userid/:img', getimagen);

export default router;

