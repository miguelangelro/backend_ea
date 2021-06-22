import{Schema, model, Document } from 'mongoose'



export interface IAmigo extends Document {
    
    email: string;
};


const amigoSchema = new Schema ({
   
    email: {
        type : String,
        required: false
    }
}); 

export default model<IAmigo>('Amigo', amigoSchema);