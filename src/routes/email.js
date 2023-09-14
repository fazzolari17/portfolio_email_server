import express from 'express';
import emailService from '../services//email/email.js';
import requestIp from 'request-ip';

// console.log('email.js', process.env.GOOGLE_APP_KEY)

const emailRouter = express.Router();

emailRouter.get('/', (req, res) => {
  res.status(200).send('emailRouter');
});

emailRouter.post('/', async (req, res) => {
  const ip = requestIp.getClientIp(req);
  const { email, name, message } = req.body.emailMessage;
  const { latitude, longitude, accuracy } = req.body.locationData;

  const confirmation = await emailService.main(req.body, ip).catch(console.error());
  res.status(200).send(confirmation)
  
});

export default emailRouter;
