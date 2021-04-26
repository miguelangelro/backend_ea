import { IPhoto } from './photo';
import { Schema, model, Document } from 'mongoose'
import { IUser } from './user';
import { IComment } from './comment';

const schema = new Schema({
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    user: {
       type: Schema.Types.ObjectId,
       ref: 'User'
    },
    description: {
        type: String
    },
    photo: {
        type: Schema.Types.ObjectId,
        ref: 'Photo'
    }
},{
    versionKey: false,
    timestamps: true
});


export interface IPost extends Document {
    comments: Array<IComment>;
    likes: Array<IUser>;
    user: IUser;
    description: string;
    photo: IPhoto;
}

export default model<IPost>('Post', schema);