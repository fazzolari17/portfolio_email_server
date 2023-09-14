import { createTransport } from 'nodemailer';
import axios from 'axios';
import dotenv from 'dotenv';
import fetchLocation from '../../utils/fetchLocation.js';
import createHtmlEmailMessage from './createHtmlEmailMessage.js';
dotenv.config();

const transporter = createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GOOGLE_USERNAME,
    pass: process.env.GOOGLE_APP_KEY,
  },
});


async function main(contactInfo, ip) {
  const { name, email, message, phone, organization } =
    contactInfo.emailMessage;
  const { latitude, longitude, accuracy } = contactInfo.locationData;
  console.error(contactInfo.locationData);
  let locationData;

  if (latitude && longitude) {
    locationData = await fetchLocation(contactInfo.locationData).catch(error => console.error(error));
  } else if (!latitude || !longitude){
    locationData = { latitude: null, longitude: null, accuracy: null }
  }

  
  

  const htmlEmailMessage = createHtmlEmailMessage(contactInfo.emailMessage, locationData, contactInfo.locationData)

  
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: ['fazzolari17@gmail.com'], // list of receivers
    subject: `New Message from Portfolio Website from ${name} at ${organization}`, // Subject line
    // text: 'Hello world?', // plain text body
    // html: '< b > Hello world?</b> ', // html body
    html: htmlEmailMessage,
  });

  console.log('Message sent: %s', info.messageId);
  console.log('Message sent: %s', info.envelope);
  return { Message: info.messageId };
}

// Remove this after it is working coorectly
// main().catch(console.error);
// main({
//   emailMessage: {
//     name: 'giuseppe fazzolari',
//     email: 'root@gmail.com',
//     message: 'hey',
//   },
//   locationData: { latitude: '35.3578369', longitude: '-83.1828001' },
// });
export default { main };
