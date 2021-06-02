import { Request, response, Response } from "express";
import User, { IUser } from "../models/user";
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer'
export const getAllUsers = async (req: Request, res: Response) => {
  const users = await User.find({}, { password: 0 });
  console.log(users);
  if (users == null)
    return res.status(404).json({ message: "Users not found" });
  else return res.status(200).json(users);
};

export const getUser = async (req: Request, res: Response) => {
  const userFound = await User.findOne(
    { username: req.params.username },
    { password: 0 }
  );
  if (userFound == null)
    return res.status(404).json({ message: "User not found" });
  else return res.status(200).json(userFound);
};

export const updatePassword = async (req: Request, res: Response) => {
  const user = await User.findById(req.userId);
  if (!user) return res.status(400).json("Error, try again.");
  const correctPassword: boolean = await user.validatePassword(
    req.body.password
  );
  if (correctPassword) {
    await User.findOneAndUpdate(
      { _id: req.userId },
      { $set: { password: await user.encryptPassword(req.body.updatedPass) } }
    );
    return res.status(200).json("Password updated successfully");
  } else {
    return res.status(400).json("Wrong password, try again.");
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const userDeleted = User.deleteOne({ username: req.params.username });
  if (userDeleted != null)
    return res.status(200).json({ "User deleted": userDeleted });
  else return res.status(400).json("User does not exist.");
};

export const deleteUserId = async (req: Request, res: Response) => {
  console.log( req.params.id)
  const userDeleted = await User.findByIdAndDelete( req.params.id);
  if (userDeleted != null)
    return res.status(200).json({ok: true});
  else return res.status(400).json({ok: false});
};

export const updateUser = async (req: Request, res: Response) => {
  try {
  
    let { password, username, email, avatar, notificaciones, privacidad  } = req.body;
    if ((password == null)) {
      //no se cambia el password 
      const user = await User.findById(req.userId);
      const userUpdated = await User.findByIdAndUpdate(
        req.userId,
        { $set: { username: username, email: email, avatar: avatar, notificaciones: notificaciones, privacidad: privacidad } },
        { new: true, runValidators: true }
      );
      // generating token
      if (userUpdated){
      const token: string = jwt.sign({_id: userUpdated._id,username: userUpdated.username, email: userUpdated.email }
      ,process.env.TOKEN_SECRET || 'tokenTEST',  { expiresIn: 86400 })  // data to be stored, secret key
      return res.status(200).json({
        ok: true,
        data: userUpdated,
        token: token,
      });
    }else{return res.status(404).json({ message: "User not found" }); } 
    
    } else {
      //se cambia el password
      const user = await User.findById(req.userId);
      if (user) {
        password = await user.encryptPassword(password);
      }
      
      const userUpdated = await User.findByIdAndUpdate(
        req.userId,
        {
          $set: {
            username: username,
            email: email,
            password: password,
            avatar: avatar,
            notificaciones: notificaciones,
            privacidad: privacidad,

          },
        },
        { new: true, runValidators: true }
      );

      if (userUpdated){
        const token: string = jwt.sign({_id: userUpdated._id,username: userUpdated.username, email: userUpdated.email }
        ,process.env.TOKEN_SECRET || 'tokenTEST',  { expiresIn: 86400 })  // data to be stored, secret key
        return res.status(200).json({
          ok: true,
          data: userUpdated,
          token: token,
        });

      }else{return res.status(404).json({ message: "User not found" }); }
     
    }
  } catch (err) {
    res.status(400).json({
      ok: false,
      error: err,
    });
  }
};

export const updateUserGym = async (req: Request, res: Response) => {
  try {
    console.log("Dentro");
    console.log(req.params.id);
    console.log(req.body);

    let { username, email, avatar, privacidad, notificaciones, autenticar } = req.body;
      //no se cambia el password 
      //const user = await User.findById(req.params.id);
      const userUpdated = await User.findByIdAndUpdate(
        req.params.id,
        { $set: { username: username, email: email, avatar: avatar, privacidad: privacidad, notificaciones: notificaciones, autenticar: autenticar } },
        { new: true, runValidators: true }
      );
      // generating token
      if (userUpdated){
      return res.status(200).json({
        ok: true,
        data: userUpdated
      });
    }else{return res.status(404).json({ message: "User not found" }); } 
    
    
  } catch (err) {
    res.status(400).json({
      ok: false,
      error: err,
    });
  }
};

export const contactUs = async (req: Request, res:Response) => {

  console.log('Hola:', req.body)
  
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'appgymder@gmail.com', // generated ethereal user
      pass: 'ocnp fllt hysd uwkg', // generated ethereal password
    },
  });

    await transporter.sendMail({
    from: '"Nuevo mensaje 👻" <appgymder@gmail.com>', // sender address
    to: "bar@example.com,", // list of receivers
    subject: req.body.subject, // Subject line
    text:  'mensaje: ' + req.body.bodyContent+ '\n' + 'Lo ha escrito:  '+ req.body.to + '\n' +  'asunto: '+ req.body.subject
          
              // plain text body
     // html body
  });


}