import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/user'

export const coachValidation = async (req: Request, res: Response, next: NextFunction) => {
    
    const coach = await User.findById(req.userId)

    if(coach == null || coach.role != 2){
        return res.status(404).json({
            ok: false,
            message: "Not coach"
        })
    } 
    
    else next();
}