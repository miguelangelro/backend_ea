import mongoose from 'mongoose'

export async function startConnection() {
    await mongoose.connect('localhost:3000',{
        useNewUrlParser: true,
        useFindAndModify: false ,
        useUnifiedTopology: true,
        useCreateIndex: true 
    });
    console.log('Database is connected');
}