import {Router} from "express"; 
import {getSalas, createSala} from '../controllers/sala.controller'
import { TokenValidation } from '../middlewares/verifyToken'
import { adminValidation } from '../middlewares/adminValidator'

const router = Router();

router.get('/all',TokenValidation,getSalas);
router.post('/new',TokenValidation,createSala);
// De momento pongo que sea accesible a cualquier usuario el createSala
// en realidad deberia poder crearlo SOLO el administrador, por lo tanto, cuando lo implementemos en el front
// deberemos poner el adminValidation

export default router;