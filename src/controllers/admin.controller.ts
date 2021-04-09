import { Request, Response } from "express";
import User, { IUser } from "../models/user";

export const getUsers = async (req:Request, res:Response) => {
    try{
    const users = await User.find({}, {password: 0});
    if(users==null) return res.status(404).json({message: "Users not found"});
    else return res.status(200).json(users);
    }catch(err){
        res.json({
            ok: false,
            error: err
        })
    }
          
}

export const getUser = async (req:Request, res:Response) => {
    try{
    const user = await User.findById(req.params.id)
    if(user==null) return res.status(404).json({message: "User not found"});
    else return res.status(200).json({
        ok: true,
        user: user
    });
    }catch(err){
        res.json({
            ok: false,
            error: err
        })
    }
          
}

export const createUser = async (req:Request, res:Response) => {
    try{
        const {name, surname, username, email, password} = req.body;
        const checkEmail = await User.findOne({email: email});
        if(checkEmail != null) return res.status(400).json({
            ok: false,
            message: "User already exists with that email"
        })

        const user: IUser = new User ({
        name, 
        surname,
        username,
        email,
        password,
        photos: []
    });

    user.password = await user.encryptPassword(user.password);
    const savedUser = await user.save ();
    res.status(200).json({
        ok: true,
        user: savedUser
    })
    }catch(err){
        res.json({
            ok: false,
            error: err
        })
    }
          
}

export const updateUser = async (req:Request, res:Response) => {
    try{
        const {name, surname, username, email} = req.body;
        const userUpdated = await User.findByIdAndUpdate(req.params.id,{$set: {name: name, surname:surname, username: username,
        email: email}},{new:true});
        if(userUpdated==null) return res.status(404).json({message: "User not found"});
        else return res.status(200).json({
        ok: true,
        user: userUpdated
    });
}catch(err){
        res.json({
            ok: false,
            error: err
        })
    }
          
}

export const deleteUser = async (req:Request, res:Response) => {
    try{
        const userDeleted = await User.findByIdAndDelete(req.params.id)
        if(userDeleted==null) return res.status(404).json({message: "User not found"});
        else return res.status(200).json({
        ok: true,
        user: userDeleted
    });
}catch(err){
        res.json({
            ok: false,
            error: err
        })
    }
          
}
