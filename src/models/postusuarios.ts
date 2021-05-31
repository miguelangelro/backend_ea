import { Schema, Document, model} from 'mongoose';

const postusuariosSchema = new Schema ({

  created: {
    type: Date
  },
  mensaje: {
    type: String
  },
  imgs: [{
    type: String
  }],

  coords: {
    type: String 
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required:[ true, 'Debe de existir una referencia']
  }
});

postusuariosSchema.pre<IPostusuarios>('save', function ( next ){
  this.created = new Date();
  next();
});


interface IPostusuarios extends Document {
  created: Date;
  mensaje: string;
  img: string[];
  coords: string;
  usuario: string
}

export const Postusuarios = model <IPostusuarios>('Postusuarios', postusuariosSchema);
