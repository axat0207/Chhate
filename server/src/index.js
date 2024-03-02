import express from 'express';
import connectMongoDB from './db.js'
import dotenv from 'dotenv';
import cors from "cors"
import cookieParser from 'cookie-parser';

dotenv.config();

const PORT = process.env.PORT || 9999;
const app = express();

connectMongoDB();

app.use(
    cors({
      origin: "*",
      credential: true,
    })
  );
  
app.use(express.json());
app.use(cookieParser());

app.get('/api/v1', (req, res) => {
    res.json({message : "Server is working fine on api/v1"})
});
app.get('/', (req, res) => {
    res.json({message : "Server is working fine on root"})
});
import user from './routes/user.js'
app.use("/api/v1/user", user);

app.listen(PORT, ()=>[
    console.log(`Server running on port ${PORT}`)
])