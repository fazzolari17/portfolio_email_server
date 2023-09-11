import logger from './logger.js';

const apiKeyChecker = (request, response, next) => {
  const authorization = request.get('authorization').replace('bearer', '').trim();
  const apiKey = process.env.EMAIL_SERVER_API_KEY;

  if (apiKey === authorization) {
    next()
  } else {
    logger.error(request.error);
    return response.status(403).send({ message: 'Invalid or missing API key' });
  }

};

export default {
  apiKeyChecker
};