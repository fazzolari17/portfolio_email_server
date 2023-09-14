import { createTransport } from 'nodemailer';
import axios from 'axios';
import dotenv from 'dotenv';
import fetchLocation from './utils/fetchLocation.js';
dotenv.config();


const transporter = createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GOOGLE_USERNAME,
    pass: process.env.GOOGLE_APP_KEY, // This is an app key from google
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function main(contactInfo, ip) {
  const { name, email, message, phone, organization } = contactInfo.emailMessage;
  const { latitude, longitude, accuracy } = contactInfo.locationData;

  const locationData = await fetchLocation(contactInfo.locationData);
  console.log(locationData);

  const htmlEmailMessage = `
  <h1>Message from portfolio server ${new Date(
    Date.now()
  ).toLocaleString()}</h1>
  <h2>${ip}</h2>
  <hr>
  <h2>Contact Name</h2>
  <p>${name}<p>
  <hr>
  <h2>Email Address<h2>
  <p>${email}</p>
  <hr>
  <h2>Message<h2>
  <p>${message}</p>
  <hr>
  ${phone ? `<h2>Phone Number</h2><p>${phone}</p>` : ''}
  <hr>
  ${organization ? `<h2>Organization</h2><p>${organization}</p>` : ''}
  <hr>
  <h2>Location</h2>
  <p>Lat:${latitude} Lon:${longitude}, Accuracy:${accuracy}</p>
  <hr>
  <h2>IP Address:</h2>
  <p>${ip}</p>
  <hr>
  <h2>Location Data:</h2>
  <p>${locationData}</p>
  <hr>
  `;
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: ['fazzolari17@gmail.com'], // list of receivers
    subject: `New Message from Portfolio Website from ${name} at ${organization}`, // Subject line
    // text: 'Hello world?', // plain text body
    // html: '< b > Hello world?</b> ', // html body
    html: htmlEmailMessage
  });

  console.log('Message sent: %s', info.messageId);
  console.log('Message sent: %s', info.envelope);
  return { 'Message': info.messageId };

}

// Remove this after it is working coorectly
// main().catch(console.error);
main({ emailMessage: { name: 'giuseppe fazzolari', email: 'root@gmail.com', message: 'hey' }, locationData: { latitude: '35.3578369', longitude: '-83.1828001' } });
export default main;
