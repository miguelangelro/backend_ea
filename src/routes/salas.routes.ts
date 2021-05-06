import {Router} from "express"; 
import {getSalas, createSala, deleteSala, addReserva} from '../controllers/sala.controller'
import { TokenValidation } from '../middlewares/verifyToken'
import { adminValidation } from '../middlewares/adminValidator'

const router = Router();

router.get('/all',TokenValidation,getSalas);
router.post('/new',TokenValidation,adminValidation,createSala);
router.delete('/:idSala',TokenValidation,adminValidation,deleteSala);
router.post('/add/:idSala',TokenValidation,addReserva);
// De momento pongo que sea accesible a cualquier usuario el createSala
// en realidad deberia poder crearlo SOLO el administrador, por lo tanto, cuando lo implementemos en el front
// deberemos poner el adminValidation

export default router;