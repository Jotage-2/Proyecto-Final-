import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    // Siempre usar MONGO_URI (la de Atlas)
    const mongoUri = process.env.MONGO_URI;
    
    const conn = await mongoose.connect(mongoUri as string);
    console.log(`✅ MongoDB Conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error: ${error}`);
    process.exit(1);
  }
};