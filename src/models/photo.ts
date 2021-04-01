import { Schema, model, Document } from 'mongoose'

const schema = new Schema({
    title: String,
    description: String,
    path: String
},{
    versionKey: false,
    timestamps: true
});

export interface IPhoto extends Document {
    title: string;
    description: string;
    path: string;
}

export default model<IPhoto>('Photo', schema);