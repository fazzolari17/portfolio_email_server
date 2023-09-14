import express from 'express';
import cors from 'cors';
import emailRouter from './routes/email.js';
import middleware from './utils/middelware.js'
import expressIp from 'express-ip';

const app = express();

app.use(expressIp().getIpInfoMiddleware);
app.use(express.json());
app.use(cors());

app.get('/ping', (_req, res) => {
  res.status(200).send('pong');
});

app.use('/email', middleware.apiKeyChecker, emailRouter);

export default app;
