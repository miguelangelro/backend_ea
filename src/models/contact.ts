import { Schema, model, Document } from 'mongoose'


const schema = new Schema({
    subject: {
        type: String,
    },
    bodyContent: {
        type: String,
    },
    to: {
        type: String,
    }
},{
    versionKey: false,
    timestamps: true
});


export interface IContact extends Document {
    subject: string;
    bodyContent:string;
    to:string;
}

export default model<IContact>('Contact', schema);