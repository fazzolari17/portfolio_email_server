import app from './src/app.js';
import http from 'http';
import config from './src/utils/config.js';
import logger from './src/utils/logger.js';
import dotenv from 'dotenv'
dotenv.config()

const server = http.createServer(app);

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
