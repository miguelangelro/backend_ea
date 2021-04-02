import { Schema, model, Document } from 'mongoose'
import bcrypt from 'bcryptjs';
import { IPhoto } from './photo';

export interface IUser extends Document {
    name: string;
    username: string;
    email: string;
    password: string;
    photos: Array<IPhoto>;
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
    photos: [
        {
            type: Object,
            ref: 'Photo'
        },
    ],
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