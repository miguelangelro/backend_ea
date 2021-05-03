import { ISala } from './sala';
import { IPost } from './post';
import { Schema, model, Document } from 'mongoose'
import { IUser } from './user';


export interface IGym extends Document {
    name: string;
    description: string;
    admin: IUser;
    ubication: string;
    telephone: number;
    inscritos: Array<IUser>;
    salas: Array<ISala>;
    posts: Array<IPost>;
    
};

const schema = new Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    admin: {
        type: Schema.Types.ObjectId,
        ref: 'User' //Coach.
    },
    ubication: {
        type: String,
    },
    telephone: {
        type: Number, 
    },
    inscritos: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
    ],
    salas:[{
        type: Schema.Types.ObjectId,
        ref: 'Salas'
    }],
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


export default model<IGym>('Gym', schema);