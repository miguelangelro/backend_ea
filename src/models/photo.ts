import { Schema, model, Document } from 'mongoose'
import { IUser } from './user';

const schema = new Schema({
   user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    path: { type: String}
},{
    versionKey: false,
    timestamps: true
});

export interface IPhoto extends Document {

    user: IUser;
    path: string;
}

export default model<IPhoto>('Photo', schema);