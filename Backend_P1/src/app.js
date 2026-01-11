import express from 'express';

const app = express(); // create an Express application


app.use(express.json());

//routes would go here
import userRouter from './routes/user.route.js';


//Route declarations
app.use('/api/v1/users', userRouter);

//example route: http://localhost:3000/api/v1/users/register


export default app;