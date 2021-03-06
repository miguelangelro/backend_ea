import { IPost } from './post';
import { Schema, model, Document } from 'mongoose'
import bcrypt from 'bcryptjs';
import { IPhoto } from './photo';
import { ISala } from './sala';
import {IAmigo} from './amigo'

export interface IUser extends Document {
    name: string;
    username: string;
    email: string;
    password: string;
    photos: Array<IPhoto>;
    avatar: string;
    role: number;
    conectado: number;
    posts: Array<IPost>
    salas: Array<ISala>
    amigos: Array<IUser>
    connected: number;
    socketId: string;
    provider: string;
    escogidopormi: [string],
    escogidopormi2:  Array<IUser>;
    image: string;
    descripcion: string;
    participa: string;
    encryptPassword(password: string): Promise<string>;
    validatePassword(password: string): Promise<boolean>;
};

const userSchema = new Schema({
    name: {
        type: String,
        required: false
    },
    palabra1: {
        type: String,
        required: false
    },
    palabra2: {
        type: String,
        required: false
    },
    surname: {
        type: String,
        required: false
    },
    username: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: 'av-1.png'
    },
    role: {
        type: Number, // 0 user, 1 admin, 2 coach
        default: 0
    },
    conectado: {
        type: Number, // 0 desconectado, 1 conectado
        default: 0
    },
    photos: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Photo'
        },
    ],
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        }
    ],
    salas: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Sala'
        }
    ],
    amigos : [
        {
             type: Schema.Types.ObjectId,
             ref: 'User'
        }
    ],
    connected: [
        {
            type: Number,
            default: 0
        }
    ],
    socketId: {
        type: String,
        required: false
    },
    provider: {
        type: String,
        required: false
    },
    escogidopormi2:[{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    escogidopormi: {
        type: [String],
    },
    image:  {
        type: String
      },
    descripcion: {
        type: String     
    },
    participa: {
        type: String     
    },
},
{
    versionKey: false,
    timestamps: true
});

userSchema.methods.encryptPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

userSchema.methods.validatePassword = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, (this as any).password);
};

export default model<IUser>('User', userSchema);