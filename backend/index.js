import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/user.js';
import feedRoutes from './routes/feeds.js';

const PORT = 8080;
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api/user', userRoutes);
app.use('/api/feeds', feedRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log(`MongoDB connect`))
  .catch((err) => console.error(err));

app.listen(PORT, () => `Server is running on ${PORT}`);
