import { Schema, model, Document } from 'mongoose'
import { IUser } from './user';

const schema = new Schema({
    title:{
        type: String
    },
   user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    description:{ type: String},
    path: { type: String}
},{
    versionKey: false,
    timestamps: true
});

export interface IPhoto extends Document {
    title: string;
    user: IUser;
    description: string;
    path: string;
}

export default model<IPhoto>('Photo', schema);