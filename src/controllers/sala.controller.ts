import { Request, Response } from "express";
import Sala, { ISala } from './../models/sala';
import User,{ IUser } from './../models/user';


export const createSala = async (req: Request,res: Response) => { 
    try{
        const {name, actividad, admin, horario, maxInscritos, inscritos} = req.body;

        const sala: ISala = new Sala ({
            name,
            actividad,
            admin,
            horario,
            maxInscritos,
            inscritos: []
    });

    const savedSala = await sala.save ();
    await User.findByIdAndUpdate(req.userId,{$push: {salas: savedSala._id }})
    res.status(200).json({
        ok: true,
        sala: savedSala
    })
    }catch(err){
        res.status(400).json({
            ok: false,
            error: err
        })
    }
}

export const getSalas = async (req:Request, res:Response) => {
    try{
    const salas = await Sala.find({});
    if(salas.length == 0) {
        return res.status(200).json({
        ok: false,
        mensaje: "No hay salas creadas todavía, vuelve a intentarlo más tarde. :( "
      });
    }

    else { 
        return res.status(200).json({
        ok: true,
        salas: salas
        });
    }

      
    }catch(err){
        res.status(400).json({
            ok: false,
            error: err
        })
    }
}

export const deleteSala = async (req:Request, res:Response) => {
    try{
        const deletedSala = await Sala.findByIdAndDelete(req.params.idSala);
            
        if(!deletedSala) {
            return res.status(404).json({
                ok: false,
                mensaje: "La sala que quieres eliminar no existe."
            });
        }
        else { 
            await User.updateMany({salas: deletedSala._id},{$pull: {salas: deletedSala._id }})
            return res.status(200).json({
            ok: true,
            sala: deletedSala
            });
        } 
    }catch(err){
        res.status(400).json({
            ok: false,
            error: err
        })
    }
}

    export const addReserva = async (req:Request, res:Response) => {
        try{
            const sala= await Sala.findById(req.params.idSala);
            if(!sala){
                return res.status(200).json({
                    ok: false,
                    mensaje: "La sala que buscas se ha eliminado.. Lo siento :( <br> Vuelve a refrescar!"
                  });
            }

            const updatedUser = await User.findByIdAndUpdate(req.userId, {$push: {salas: sala._id }}, {new: true})
            if(!updatedUser) return res.status(404).json({
                ok: false,
                mensaje: "Error al actualizar el usuario"
            })
            await Sala.findByIdAndUpdate(sala._id,{$push: {inscritos: updatedUser._id}})
            return res.status(200).json({
                ok: true,
                reservas: updatedUser
            })
  
        }catch(err){
            res.status(400).json({
                ok: false,
                error: err
            })
        }
          
    }

    export const getReservas = async (req:Request, res:Response) => {
        try{
            const user = await User.findById(req.userId);
            if(!user){
                return res.status(404).json({
                    ok: false,
                    mensaje: "No se encuentra el user."
                  });
            }
            const reservasUser = await Sala.find({inscritos:user._id});
        if(reservasUser.length == 0) {
            return res.status(200).json({
            ok: false,
            mensaje: "Todavía no has reservado ninguna clase.. Vuelve atrás y empieza a ponerte en forma ;)"
          });
        }
    
        else { 
            return res.status(200).json({
            ok: true,
            reservas: reservasUser
            });
        }
    
          
        }catch(err){
            res.status(400).json({
                ok: false,
                error: err
            })
        }
    }

export const deleteReserva = async (req:Request, res:Response) => {
    try{
        const user = await User.findById(req.userId); 
        if(!user){
            return res.status(404).json({
                ok: false,
                mensaje: "No se encuentra el user."
              });
        }
        const sala = await Sala.findByIdAndUpdate(req.params.idReserva, {$pull: {inscritos: user._id }});
        if(!sala){
            return res.status(404).json({
                ok: false,
                mensaje: "No se encuentra la sala."
              });
        }
        const userUpdated = await User.findByIdAndUpdate(req.userId,{$pull: {salas: sala._id }},{new:true});
        
        return res.status(200).json({
            ok: true,
            user: userUpdated
        });
    }catch(err){
        res.status(400).json({
            ok: false,
            error: err
        })
    }
}