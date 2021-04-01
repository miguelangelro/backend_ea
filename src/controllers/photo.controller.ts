import { Request, Response } from 'express'
import fs from 'fs-extra';
import path from 'path'
import User from '../models/user'

// Models
import Photo, { IPhoto } from '../models/photo';

export async function getPhotos(req: Request, res: Response): Promise<Response> {
    const photos = await Photo.find();
    return res.json(photos);
};

export async function createPhoto(req: Request, res: Response): Promise<Response> {
    const { title, description } = req.body;
    
    const newPhoto: IPhoto = new Photo ({
        title, 
        user: req.userId,
        description,
        path: req.file.path
    });
  
    const savedPhoto = await newPhoto.save();
    console.log(savedPhoto)

    await User.findOneAndUpdate({_id: req.userId},{$push: {photos: savedPhoto._id}});
   
    return res.status(200).json({
        message: 'Photo Saved Successfully',
    
    });
};

export async function getPhotosUser(req: Request, res: Response): Promise<Response> {
    const { username } = req.params;
    const photos = await User.findOne({"username": username},{photos: 1});
    return res.json(photos);
}

export async function deletePhoto(req: Request, res: Response): Promise<Response> {
    // We must do a check in order to not let another user to delete my photos.
    const { id } = req.params;
    const photo = await Photo.findByIdAndRemove(id) as IPhoto;
    await User.findByIdAndUpdate(req.userId, {$pull: {photos: {$in: id }}}) // Deleted from Photo array of the user.

    if (photo) {
        await fs.unlink(path.resolve(photo.path));
    }
    return res.json({ message: 'Photo Deleted' });
};

export async function updatePhoto(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { title, description } = req.body;
    const updatedPhoto = await Photo.findByIdAndUpdate(id, {
        title,
        description
    });
    return res.json({
        message: 'Successfully updated',
        updatedPhoto
    });
}