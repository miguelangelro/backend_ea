import{Request,Response} from'express'
import User, {IUser} from '../models/user';
import jwt from 'jsonwebtoken';


export const signup = async (req: Request,res: Response) => { 
    console.log(req.body);
    const {name, surname, username, email, password, photos} = req.body;

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

 // generating token
  const token: string = jwt.sign({_id: savedUser._id}, process.env.TOKEN_SECRET || 'tokenTEST') // data to be stored, secret key
  return res.header('auth-token', token).json(savedUser); // returning the token value in the header and the user data in the payload.
  
};

export const signin = async (req: Request,res: Response) => {
 const user = await User.findOne({email: req.body.email});// finding user by email

 if(!user) return res.status(400).json("Error, try again.");
   const correctPassword: boolean =await user.validatePassword(req.body.password);

   if(!correctPassword) return res.status(404).json('invalid Password');
   //generate token
   const token: string =jwt.sign({_id: user._id},process.env.TOKEN_SECRET || 'tokenTEST', {expiresIn: 86400}  ) // expires in a day
   
  return res.header('auth-token', token).json(user);   
};

export const profile = async (req: Request,res: Response) => {
    
    const user = await User.findById(req.userId, {password : 0});
    if(!user) return res.status(404).json("Not found")
    return res.json(user); 
   
}
