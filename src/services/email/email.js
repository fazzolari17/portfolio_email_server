import axios from 'axios';
import createHtmlEmailMessage from './createHtmlEmailMessage.js';
import mailConfig from '../../config/email_config.js'
import dotenv from 'dotenv'
dotenv.config();


const fetchLocationFromGps = async (locationData) => {
  const { latitude, longitude } = locationData;

  const locationUrl = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

  const response = await axios.get(locationUrl);
  return response.data;
};

const fetchLocationFromIp = async (ipAddress) => {
  const uri = `http://api.ipapi.com/api/${ipAddress}?access_key=${process.env.IP_LOOKUP_API_KEY}`;
  const response = await axios.get(uri);

  return response.data;
};

async function main(contactInfo, ip) {
  const { name, email, message, phone, organization } = contactInfo.body.emailMessage;
  const { latitude, longitude, accuracy } = contactInfo.body.locationData;
  let locationData;

  if (latitude && longitude) {
    locationData = await fetchLocationFromGps(contactInfo.body.locationData).catch(error => console.error(error));
  } else if (!latitude || !longitude){
    locationData = { latitude: null, longitude: null, accuracy: null }
  }

  const ipLocationData = await fetchLocationFromIp(ip).catch(error => console.error(error));

  const htmlEmailMessage = createHtmlEmailMessage(contactInfo.body.emailMessage, locationData, contactInfo.body.locationData, ipLocationData, contactInfo)

  
  // send mail with defined transport object
  const info = await mailConfig.zohoTransporter.sendMail({
    from: process.env.ZOHO_USERNAME,
    to: ['fazzolari17@gmail.com'], // list of receivers
    subject: `New Message from Portfolio Website from ${name} at ${organization}`,
    html: htmlEmailMessage,
  }).catch(error => console.error(error));

  console.log('Message sent: %s', info.messageId);
  console.log('Message sent: %s', info.envelope);
  return { Message: info.messageId };
}

export default { main };
