import { FileUpload } from "interfaces/file-upload";

import path from "path";
import fs from "fs";
import uniqid from "uniqid";

export default class FileSystem {
  constructor() {}

  guardarImagenTemporal(file: FileUpload, userId: string) {
    return new Promise<void>((resolve, reject) => {
      //Crear carpetas
      const path = this.crearCarpetaUsuario(userId);
      console.log("path",path);

      //Nombre del archivo
      const nombreArchivo = this.generarNombreUnico(file.name);
      console.log(nombreArchivo);

      //Mover el archivo del Temp a nuestra carpeta
      file.mv(`${ path }/${ nombreArchivo }`, (err: any) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
  private generarNombreUnico(nombreOriginal: string) {
    const nombreArr = nombreOriginal.split(".");
    const extension = nombreArr[nombreArr.length - 1];

    const idUnico = uniqid();

    return `${idUnico}.${extension}`;
  }

  private crearCarpetaUsuario(userId: string) {
    const pathUploads = path.resolve(__dirname, "../uploads/");
    const existeuploads = fs.existsSync(pathUploads);
    if (!existeuploads) {
      fs.mkdirSync(pathUploads);
    }
    const pathUser = path.resolve(__dirname, "../uploads/", userId);
    const pathUserTemp = pathUser + "/temp";
    console.log('pathuser', pathUserTemp);

    const existe = fs.existsSync(pathUser);

    if (!existe) {
      fs.mkdirSync(pathUser);
      fs.mkdirSync(pathUserTemp);
    }

    return pathUserTemp;
  }


  imagenesDeTempHaciaPost(userId: string){
    const pathTemp = path.resolve(__dirname, "../uploads/", userId, 'temp');
    const pathPost = path.resolve(__dirname, "../uploads/", userId, 'posts');

    if (!fs.existsSync (pathTemp)) {
      return [];
    }

    if (!fs.existsSync (pathPost)) {
      fs.mkdirSync( pathPost );
    }

    const imagenesTemp = this.obtenerImagenesEnTemp (userId);

    imagenesTemp.forEach ( imagen => {
      fs.renameSync(`${ pathTemp }/${imagen}`,`${ pathPost }/${imagen}`  )
    });

    return imagenesTemp;

  }

  obtenerImagenesEnTemp( userId: string ){
    const pathTemp = path.resolve(__dirname, "../uploads/", userId, 'temp');

    return fs.readdirSync ( pathTemp ) || [];


  }

  getFotoUrl (userId: string, img: string) {

    const pathFoto =  path.resolve(__dirname, "../uploads/", userId, 'posts', img);
    console.log(pathFoto);

    const existe = fs.existsSync( pathFoto );
    if (!existe){
      return path.resolve( __dirname, '../assets/400x250.jpg');

    }

    return pathFoto;

  }

  private crearCarpetaUsuarioPerfil(userId: string) {
    const pathUploads = path.resolve(__dirname, "../uploads/");
    const existeuploads = fs.existsSync(pathUploads);
    if (!existeuploads) {
      fs.mkdirSync(pathUploads);
    }
    const pathUser = path.resolve(__dirname, "../uploads/", userId);
    const pathUserTemp = pathUser + "/temp";
    console.log('pathuser', pathUserTemp);

    const existe = fs.existsSync(pathUser);

    if (!existe) {
      fs.mkdirSync(pathUser);
      fs.mkdirSync(pathUserTemp);
    }

    return pathUserTemp;
  }

  imagenesDeTempHaciaPostPerfil(userId: string){
    const pathTemp = path.resolve(__dirname, "../uploads/", userId, 'temp');
    const pathPost = path.resolve(__dirname, "../uploads/", userId, 'perfil');

    if (!fs.existsSync (pathTemp)) {
      return [];
    }

    if (!fs.existsSync (pathPost)) {
      fs.mkdirSync( pathPost );
    }

    const imagenesTemp = this.obtenerImagenesEnTemp (userId);

    imagenesTemp.forEach ( imagen => {
      fs.renameSync(`${ pathTemp }/${imagen}`,`${ pathPost }/${imagen}`  )
    });

    return imagenesTemp;

  }

  guardarImagenTemporalPerfil(file: FileUpload, userId: string) {
    return new Promise<void>((resolve, reject) => {
      //Crear carpetas
      const path = this.crearCarpetaUsuario(userId);
      console.log("path",path);

      const nombreArchivo = this.generarNombreUnico(file.name);

      //Mover el archivo del Temp a nuestra carpeta
      file.mv(`${ path }/${ nombreArchivo }`, (err: any) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  getFotoUrlPerfil (userId: string, img: string) {

    const pathFoto =  path.resolve(__dirname, "../uploads/", userId, 'perfil', img);
    console.log(pathFoto);

    const existe = fs.existsSync( pathFoto );
    if (!existe){
      return path.resolve( __dirname, '../assets/400x250.jpg');

    }

    return pathFoto;

  }

















}
