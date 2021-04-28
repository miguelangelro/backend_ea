import { Request, Response } from "express";
import fs from 'fs-extra';
import path from 'path'
import User, {IUser} from "../models/user";
import Comment, {IComment} from "../models/comment"
import Photo, {IPhoto} from "../models/photo"


export async function addPost(req: Request, res: Response): Promise<Response>{


    return res.json("")
};

export async function getPost(req: Request, res: Response): Promise<Response>{


return res.json("")
};

export async function getAllPosts(req: Request, res: Response): Promise<Response>{


    return res.json("")
};


export async function updatePost(req: Request, res: Response): Promise<Response>{


    return res.json("")
};

export async function deletePost(req: Request, res: Response): Promise<Response>{


    return res.json("")
};
