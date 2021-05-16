import { Request, Response } from "express";
import Sala, { ISala } from './../models/sala';
import { IUser } from './../models/user';


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
    if(salas==null) return res.status(400).json({
        ok: false,
        mensaje: "No hay salas creadas."
      });

    else return res.status(200).json(salas);
      
    }catch(err){
        res.status(400).json({
            ok: false,
            error: err
        })
    }
          
}