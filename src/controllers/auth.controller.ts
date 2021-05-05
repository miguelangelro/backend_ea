import{Request,Response} from'express'
import User, {IUser} from '../models/user';
import jwt from 'jsonwebtoken';


export const signup = async (req: Request,res: Response) => { 
  try{    
  console.log(req.body);
    const {name, surname, username, email, role, avatar, password, photos} = req.body;

    const user: IUser = new User ({
        name, 
        surname,
        username,
        email,
        role,
        avatar,
        password,
        photos: []
    });

  user.password = await user.encryptPassword(user.password);
  const savedUser = await user.save ();

 // generating token
  const token: string = jwt.sign({_id: savedUser._id,username: user.username, email: user.email }
  ,process.env.TOKEN_SECRET || 'tokenTEST',  { expiresIn: 86400 })  // data to be stored, secret key
  return res.status(200).json({
    ok: true,
    token: token,
    user: savedUser
  });

}catch(err){
  res.status(400).json({
      ok: false,
      error: err
  })
}
  
};

export const signin = async (req: Request, res: Response) => {
  const user = await User.findOne({ email: req.body.email }); // finding user by email

  if (!user) return res.status(400).json({
    ok: false,
    mensaje: "Error, try again."
  });
  const correctPassword: boolean = await user.validatePassword(
    req.body.password
  );

  if (!correctPassword) return res.status(404).json({
    ok: false,
    mensaje: "invalid Password"
  });
  //generate token
  const token: string = jwt.sign(
    { _id: user._id, username: user.username, email: user.email },
    process.env.TOKEN_SECRET || "tokenTEST",
    { expiresIn: 86400 }
  ); // expires in a day

  return res.status(200).json({
    ok: true,
    token: token,
  });
};

export const profile = async (req: Request,res: Response) => {
    
    const user = await User.findById(req.userId, {password : 0});
    if(!user) return res.status(404).json("Not found")
    return res.json(user); 
   
}


export const getMe = async (req: Request,res: Response) => { 
  try{    
  const userMe = await User.findById(req.userId);

 // generating token
  return res.status(200).json({
    ok: true,
    user: userMe
  });

}catch(err){
  res.status(400).json({
      ok: false,
      error: err
  })
}
  
};
