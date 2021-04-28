import { IPost } from './post';
import { Schema, model, Document } from 'mongoose'
import { IUser } from './user';



export interface ISala extends Document {
    
};

const schema = new Schema({
    name: {
        type: String,
    },
    actividad: {
        type: String,
    },
    admin: {
        type: Schema.Types.ObjectId,
        ref: 'User' //Coach.
    },
    horario: {
        type: String,
    },
    maxInscritos: {
        type: Number,
    },
    inscritos: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
    ]
},
{
    versionKey: false,
    timestamps: true
});


export default model<ISala>('Sala', schema);