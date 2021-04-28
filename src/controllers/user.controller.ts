import { Request, Response } from "express";
import { read } from "fs-extra";
import User from "../models/user";


export const getAllUsers = async (req:Request, res:Response) => {
    
    const users = await User.find({}, {password: 0});
    console.log(users);
    if(users==null) return res.status(404).json({message: "Users not found"});
    else return res.status(200).json(users);
          
}

export const getUser = async (req:Request, res:Response) => { 
   
   const userFound = await  User.findOne({"username":req.params.username}, {password: 0,  email: 0})
   if(userFound==null) return res.status(404).json({message: "User not found"});
   else return res.status(200).json(userFound);
 
}

export const updatePassword = async (req: Request, res: Response) =>{
    
    const user = await User.findById(req.userId);
    if(!user) return res.status(400).json("Error, try again.");
    const correctPassword: boolean =await user.validatePassword(req.body.password);
    if(correctPassword){
        await User.findOneAndUpdate({"_id": req.userId},{$set: {"password": await user.encryptPassword(req.body.updatedPass)}})
        return res.status(200).json("Password updated successfully")
    }else{
        return res.status(400).json("Wrong password, try again.")
    }
}


export const deleteUser = async (req:Request,res:Response) => {
    
    const userDeleted = User.deleteOne({"username":req.params.username});
    if(userDeleted != null) return res.status(200).json({"User deleted": userDeleted});
    else return res.status(400).json("User does not exist.");
    
}

export const getCoaches = async (req:Request, res:Response) => {
    const coaches = await User.findOne({"rol":2},{password: 0, email: 0})
    if(coaches==null) 
    return res.status(404).json({message: "User not found"});
    else return res.status(200).json(coaches);
}

export const getCoach = async (req:Request, res:Response) => {
    const coach = await User.findOne({"rol":2 , "username": req.params.username},{password:0, email:0} )
    if (coach== null)
    return res.status(404).json({message: "Coach not found"});
    else return res.status(200).json(coach);
}
