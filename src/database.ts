import mongoose from 'mongoose'

export async function startConnection() {
    await mongoose.connect('mongodb://127.0.0.1/gymder',{
        useNewUrlParser: true,
        useFindAndModify: false ,
        useUnifiedTopology: true,
        useCreateIndex: true 
    });
    console.log('Database is connected');
}