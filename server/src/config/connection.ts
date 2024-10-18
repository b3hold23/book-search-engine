import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGODB_URI  = process.env.MONGODB_URI || '';

const db = async (): Promise<typeof mongoose.connection> => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to the database');
        return mongoose.connection;
    } catch (error) {
        console.error('Database does not feel so good Mr. Stark', error);
        throw new Error('Database connection failed');
    }
}

export default db;