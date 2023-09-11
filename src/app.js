import express from 'express';
import cors from 'cors';
import emailRouter from './routes/email.js';
import middleware from './utils/middelware.js'

const app = express();
// const PORT = process.env.port || 3001;

app.use(express.json());
app.use(cors());

app.get('/ping', (_req, res) => {
  res.status(200).send('pong');
});

app.use('/email', middleware.apiKeyChecker, emailRouter);

export default app;
