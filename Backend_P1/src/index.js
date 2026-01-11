import dotenv from 'dotenv';
import connectDB from './config/database.js';
import app from './app.js';
 
dotenv.config(
    { path: './.env' }
);

const startServer = async () => {
  try {

    await connectDB();
    app.on('error', (error) => {
      console.log('ERROR', error);
      throw error;
    });
    
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server is running on port ${process.env.PORT || 3000}`);
    });   

  } catch(error) {
    console.log('Database connection failed', error);
    process.exit(1);
  }
    // You can add more configuration or server start logic here
}

startServer();