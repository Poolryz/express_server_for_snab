import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import applicationsRouter from './routes/applications.js';
import uploadsRouter from './routes/uploads.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(join(__dirname, 'uploads')));

// Routes
app.use('/api/applications', applicationsRouter);
app.use('/api/uploads', uploadsRouter);

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/metes_snab')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));