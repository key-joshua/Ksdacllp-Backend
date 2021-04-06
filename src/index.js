import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import allRoutes from './routes';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once('open', () => { console.log("Development Db Connected"); });

app.use('/api', allRoutes);
app.get('**', (req, res) => res.status(200).json({ status: 200, message: `Welcome to Ksdacllp Backend` }));

app.listen(process.env.PORT, () => { console.log('Server Started on', process.env.PORT); });

export default app;
