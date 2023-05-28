import dotenv from "dotenv"
import mongoose from "mongoose"
dotenv.config();

function connectToDB(){
    mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true });

    // Handling connection events
    mongoose.connection.on('connected', () => {
    console.log('Mongoose connection is open');
    });

    mongoose.connection.on('error', (err) => {
    console.log(`Mongoose connection error has occurred: ${err}`);
    });

    mongoose.connection.on('disconnected', () => {
    console.log('Mongoose connection is disconnected');
    });   
}

export default connectToDB;