import{Request,Response} from'express'
import User, {IUser} from '../models/user';
import jwt from 'jsonwebtoken';
import {sendEmail} from '../libs/sendEmail'


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
  console.log("llego");
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

export const forgotPassword = async (req: Request,res: Response) => { 
  var randomstring = Math.random().toString(36).slice(-8)
 /*  var array = new Uint32Array(10);
  var randomstring = window.crypto.getRandomValues(array); */
  const message = `Usted ha recibido un email porque ha solicitado el retablecimiento de su pasword, su nuevo password es: ${ randomstring }`
  
  //const nuevopass = randomstring.toString;
  try{    
    const user = await User.findOne({email: req.body.email})
    const html = `<b> Hola ${ user?.username }</b> <br> Se le ha enviado un email para restablecer su contraseña en Gymder<br> Contraseña nueva: <br> <br> <b> ${ randomstring } </b> `
    console.log("el email es",  req.body.email)
    if (!user){
      return res.status(400).json({
        ok: false,
        error: "Email no existente"
      });
    }
    await sendEmail({
      email: req.body.email,
      subject: "¿forgotPassword?",
      message,
      html
    });


    user.password = await user.encryptPassword(randomstring);
    const saveduser = await user.save();

  return res.status(200).json({
    ok: true,
    msg: "Email enviado"
  });

}catch(err){
  res.status(400).json({
      ok: false,
      error: err
  })
}  
};


export const checkemail = async (req: Request, res: Response) => {
  let email = req.body.email;
  await User.findOne({'email': email}).then((data) => {
      
      if(data) return res.status(200).json({ok: true});
      else return res.status(200).json({ok: false});
  })
}


export const signinRedesSociales = async (req: Request, res: Response) => {
 try {  
  const user = await User.findOne({ email: req.body.email }); // finding user by email

  if (!user) return res.status(400).json({
    ok: false,
    mensaje: "Error, try again."
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
 } catch (err) {
  res.status(400).json({
    ok: false,
    error: err
})
 }
};








