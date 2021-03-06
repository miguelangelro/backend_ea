import { Request, Response } from "express";
import User, { IUser } from "../models/user";
import jwt from 'jsonwebtoken';
import { Postusuarios } from '../models/postusuarios';
import { FileUpload } from "interfaces/file-upload";
import FileSystem from '../libs/file-system';



const fileSystem = new FileSystem();



export const postusuario = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    body.usuario = req.userId

    const imagenes = fileSystem.imagenesDeTempHaciaPost(req.userId);
    body.imgs = imagenes;
    const savedPost = (await Postusuarios.create(body));

 /*     const savedPost = (await Postusuarios.create(body)).populate({
      path: 'usuario',
      select: 'email username'
    });
   */
  await savedPost.populate('usuario','-password').execPopulate();


      return res.status(200).json({
        ok: true,
        post: savedPost,
      });
  } catch (err) {
    res.status(400).json({
      ok: false,
      error: err,
    });
  }
};


export const postusuarioperfil = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    body.usuario = req.userId;
    const descripcion = body.descripcion;
    const participa = body.participa;
    const imagenes = fileSystem.imagenesDeTempHaciaPostPerfil(req.userId);
    body.imgs = imagenes;
    // const savedPost = (await Postusuarios.create(body));

    const  imagen1 = imagenes[0];
    console.log("imagen1", imagen1)
    const userUpdated = await User.findByIdAndUpdate(
      req.userId,
      { $set: {image: imagen1 , descripcion: descripcion, participa: participa} }
    
    );

    const userwithAll = await User.findById(req.userId);

 /*     const savedPost = (await Postusuarios.create(body)).populate({
      path: 'usuario',
      select: 'email username'
    });
   */
  //await savedPost.populate('usuario','-password').execPopulate();


      return res.status(200).json({
        ok: true,
        post: userwithAll,
      });
  } catch (err) {
    res.status(400).json({
      ok: false,
      error: err,
    });
  }
};

export const getpostusuario = async (req: Request, res: Response) => {
  try {
    const pagina = Number(req.query.pagina) || 1;
    let skip = pagina -1;
    skip = skip *10;
    const posts = await Postusuarios.find().sort({_id: -1}).skip(skip).limit(10).populate('usuario','-password');
 return res.status(200).json({
        ok: true,
        pagina,
        posts: posts
      });
  } catch (err) {
    res.status(400).json({
      ok: false,
      error: err,
    });
  }
};


export const uploadfiles = async (req: any, res: Response) => {
  try {
    if(!req.files) {
      return res.status(400).json({
        ok: false,
        mensaje: "No se subio ninguna foto"
      });
    }

    const file: FileUpload = req.files.image;

    if (!file){
      return res.status(400).json({
        ok:false,
        mensaje: 'No se subi?? ningun archivo - imagen'
      })
    }
    if ( !file.mimetype.includes('image') ) {
      return res.status(400).json({
        ok:false,
        mensaje: 'No se subi?? una imagen'
      
    });
  }

   await fileSystem.guardarImagenTemporal(file, req.userId);

  


      return res.status(200).json({
        ok: true,
        data: file.mimetype
      });

      
  } catch (err) {
    res.status(400).json({
      ok: false,
      error: err,
    });
  }
};



export const getimagen = async (req: any, res: Response) => {
  try {
  const userId = req.params.userid;
  const img = req.params.img;

  const pathFoto = fileSystem.getFotoUrl(userId, img);

  res.sendFile (pathFoto);

    
 /* return res.status(200).json({
        ok: true,
        userId,img
      }); */
  } catch (err) {
    res.status(400).json({
      ok: false,
      error: err,
    });
  }
};



export const uploadfilesperfil = async (req: any, res: Response) => {
  try {
    if(!req.files) {
      console.log("No se subio foto")
      return res.status(400).json({
        ok: false,
        mensaje: "No se subio ninguna foto"
      });
    }

    const file: FileUpload = req.files.photo;

    if (!file){
      return res.status(400).json({
        ok:false,
        mensaje: 'No se subi?? ningun archivo - imagen'
      })
    }
    if ( !file.mimetype.includes('image') ) {
      return res.status(400).json({
        ok:false,
        mensaje: 'No se subi?? una imagen'
      
    });
  }

   await fileSystem.guardarImagenTemporalPerfil(file, req.userId);

  


      return res.status(200).json({
        ok: true,
        data: file.mimetype
      });

      
  } catch (err) {
    res.status(400).json({
      ok: false,
      error: err,
    });
  }
};


export const getimagenPerfil = async (req: any, res: Response) => {
  try {
  const userId = req.params.userid;
  const img = req.params.img;
 
  const pathFoto = fileSystem.getFotoUrlPerfil(userId, img);

  res.sendFile (pathFoto);

    
 /* return res.status(200).json({
        ok: true,
        userId,img
      }); */
  } catch (err) {
    res.status(400).json({
      ok: false,
      error: err,
    });
  }
};








