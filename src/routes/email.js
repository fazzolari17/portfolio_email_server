import express from 'express';
import emailer from './../emailer.js';


const emailRouter = express.Router();

emailRouter.get('/', (req, res) => {
  res.status(200).send('emailRouter');
});

emailRouter.post('/', async (req, res) => {
  const { email, name, message } = req.body;
  console.log(email, name, message);
  console.log(req.body);

  const confirmation = await emailer(req.body).catch(console.error());
  res.status(200).send(confirmation)
  
});

export default emailRouter;
