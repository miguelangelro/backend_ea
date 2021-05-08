import User, {IUser} from '../models/user';
import { Request, Response } from "express";

export const getUsers = async (req:Request, res:Response) => {
    try{
    const users = await User.find({}, {password: 0});
    if(users==null) return res.status(404).json({message: "Users not found"});
    else return res.status(200).json(users);
    }catch(err){
        res.status(400).json({
            ok: false,
            error: err
        })
    }
          
}