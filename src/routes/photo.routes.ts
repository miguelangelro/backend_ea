import {Router} from 'express'
import { TokenValidation } from '../middlewares/verifyToken'
import upload from '../libs/multer'
import {getPhotos, getPhotosUser,updatePhoto, deletePhoto, createPhoto} from '../controllers/photo.controller'
const router = Router();

router.post('/upload', TokenValidation, upload.single('image'),createPhoto)
router.get('/all', TokenValidation, getPhotos);
router.get('/:username', TokenValidation, getPhotosUser);
router.put('/update', TokenValidation, updatePhoto)
//router.post('/me', TokenValidation, updateMe); // Para actualizar nuestros datos, más adelante miramos qué campos poner.
router.delete('/:id',TokenValidation, deletePhoto);

export default router;