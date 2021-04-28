import { IPost } from './post';
import { Schema, model, Document } from 'mongoose'
import { IUser } from './user';


const schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
    comment: {
        type: String,
    }
},{
    versionKey: false,
    timestamps: true
});


export interface IComment extends Document {
    user: IUser;
    post: IPost;
    comment: string;
}

export default model<IComment>('Comment', schema);