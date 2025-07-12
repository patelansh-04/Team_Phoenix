import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import itemRoutes from './routes/item.routes.js';
import adminRoutes from './routes/admin.routes.js';
import { errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();
connectDB();

const app = express();

// ---- global middleware ----
app.use(cors({ origin: ['http://localhost:8080'], credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

// ---- routes ----
app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/admin', adminRoutes);

// ---- error handler ----
app.use(errorHandler);

// ---- start server ----
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
