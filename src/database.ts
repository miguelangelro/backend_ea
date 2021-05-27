import mongoose from 'mongoose'

export async function startConnection() {

    await mongoose.connect('mongodb://localhost/gymder',{
        useNewUrlParser: true,
        useFindAndModify: false ,
        useUnifiedTopology: true,
        useCreateIndex: true 
    });
    console.log('Database is connected');
}