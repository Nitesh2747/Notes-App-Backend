import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import pasteRoutes from './routes/pasteRoutes.js';

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/pastes', pasteRoutes);


app.get('/', (req, res) => {
    res.send('Notes API is running');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
