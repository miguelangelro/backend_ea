import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/user'

export const adminValidation = async (req: Request, res: Response, next: NextFunction) => {
    
    const admin= await User.findById(req.userId)
    if(admin == null || admin.role != 1){
        return res.status(404).json({
            ok: false,
            message: "Not admin"
        })
    } 
    else next();
}