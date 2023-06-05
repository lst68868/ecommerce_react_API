import dotenv from "dotenv"
import mongoose from "mongoose"
dotenv.config();
const connectionString = "mongodb+srv://lst68868:i4cCEBp5z95FmNAz@ecommercedb.stpkutv.mongodb.net/Storefront?retryWrites=true&w=majority"
function connectToDB(){
    mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

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