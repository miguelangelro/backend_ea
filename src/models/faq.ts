
import { Schema, model, Document } from 'mongoose'

export interface IFaq extends Document {
    
    pregunta: string;
    respuesta: string;
    
};

const userSchema = new Schema({
    pregunta: {
        type: String,
        required: false
    },
    respuesta: {
        type: String,
        required: false
    }
},
{
    versionKey: false,
    timestamps: true
});



export default model<IFaq>('Faq', userSchema);