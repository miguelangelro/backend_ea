import { Request, Response } from "express"
import User, { IUser } from "../models/user";

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

export const getUser = async (req:Request, res:Response) => { 
   
    const userFound = await  User.findOne({"username":req.params.username}, {password: 0,  email: 0})
    if(userFound==null) return res.status(404).json({message: "User not found"});
    else return res.status(200).json(userFound);
  
 }
 