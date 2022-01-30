import SERVER_ENV from './server.config';
import LOG_ENV from './logger.config.js';

const environment = process.env.NODE_ENV || 'development';

const serverConf = SERVER_ENV[environment];
const logConf = LOG_ENV[environment];

export {
    environment,
    serverConf,
    logConf
};