import { IPost } from './post';
import { Schema, model, Document } from 'mongoose'
import bcrypt from 'bcryptjs';
import { IPhoto } from './photo';

export interface IUser extends Document {
    name: string;
    username: string;
    email: string;
    password: string;
    photos: Array<IPhoto>;
    role: number;
<<<<<<< HEAD
    
=======
    posts: Array<IPost>
>>>>>>> aeafe30d1e7839ae894ebf3869bf0b39801dc9a3
    encryptPassword(password: string): Promise<string>;
    validatePassword(password: string): Promise<boolean>;
};

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
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
    role: {
<<<<<<< HEAD
        type: Number, // 0 user, 1 admin, 2 entrandor 
=======
        type: Number, // 0 user, 1 admin, 2 coach
>>>>>>> aeafe30d1e7839ae894ebf3869bf0b39801dc9a3
        required: true
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
    ]
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