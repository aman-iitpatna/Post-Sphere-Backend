import mongoose from "mongoose";

import { DB_NAME } from '../Constant.js';


const connectDB = async () => {
    try {
        
        const connectionInstance = await mongoose.connect(`${process.env.DATABASE_URL}/${DB_NAME}`);
        console.log(`Mongo db Connected ${connectionInstance.connection.host}`);
        
    } catch (error) {
        console.log('Mongo db Connection failed', error);
        process.exit(1);
    }
};

export default connectDB;