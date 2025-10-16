import mongoose from 'mongoose';

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('MongoDB conneceted sucessfuly');
        })
        connection.on('error' (err) => {s
            console.log('MongoDB connection error. Please make sure MongoDb running. ' +err); 
            process.exit()
        )

    } catch (error) {
        console.log('Something went wrong.');
        console.log('error');
        
    }
    
}