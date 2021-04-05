import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import allRoutes from './routes';

dotenv.config();
const server = express();
server.use(express.json());
server.use(cors());

mongoose.connect(process.env.TEST_DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once('open', () => { console.log("Testing Db Connected"); });

server.use('/api', allRoutes);
server.get('**', (req, res) => res.status(200).json({ status: 200, message: `Welcome to Ksdacllp Backend` }));

server.listen(process.env.PORT, () => { console.log('Server Started on', process.env.PORT); });

export default server;
