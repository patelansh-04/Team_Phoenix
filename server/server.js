const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
// Routes
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
const itemRoutes = require('./routes/itemRoutes');
const swapRoutes = require('./routes/swapRoutes');
const adminRoutes = require('./routes/adminRoutes');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

<<<<<<< HEAD
// CORS configuration with fallback for missing CLIENT_ORIGIN
const corsOptions = {
  origin: process.env.CLIENT_ORIGIN 
    ? process.env.CLIENT_ORIGIN.split(',') 
    : ['http://localhost:5173', 'http://localhost:3000'],
=======
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:8080', // Default to Vite's default port
>>>>>>> 474384150c3d59b32d9e4b6c3b7a526e7f302ced
  credentials: true,
};

app.use(cors(corsOptions));
app.set('trust proxy', 1);

// Credentials: Allows cookies, Authorization headers, and TLS client certificates to be sent from the frontend
app.use(express.json());
app.use(cookieParser());
// CookieParser: It parses the Cookie header in incoming HTTP requests and populates req.cookies with a JavaScript object of key–value pairs.

// Authentication done in that routes file separately
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes); // Authorization

// Items, Swaps, and Admin
app.use('/api/items', itemRoutes);
app.use('/api/swaps', swapRoutes);
app.use('/api/admin', adminRoutes);


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch((err) => console.error(err));
