import {Router} from "express"; 
import {getSalas, createSala, deleteSala, addReserva, getReservas, deleteReserva} from '../controllers/sala.controller'
import { TokenValidation } from '../middlewares/verifyToken'
import { adminValidation } from '../middlewares/adminValidator'

const router = Router();

router.get('/all',TokenValidation,getSalas);
router.get('/my',TokenValidation,getReservas);
router.post('/new',TokenValidation,adminValidation,createSala); //el admin crea sala para reservar
router.delete('/:idSala',TokenValidation,adminValidation,deleteSala);// el admin elimina la sala
router.post('/add/:idSala',TokenValidation,addReserva);//Añadir una reserva a un usuario
router.delete('/my/:idReserva',TokenValidation, deleteReserva) //Eliminar una reserva de un usuario


export default router;