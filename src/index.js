const path = require('path');
const db = require('./db');
const app = require('./app');
const { createConfig } = require('./config/config');
const { logger } = require('./log/logger-logstash');

async function execute() {
    logger.info('preparing account service ...');
    
    const configPath = path.join(__dirname, '../configs/.env');
    const appConfig = createConfig(configPath);

    logger.info({configPath:configPath});

    await db.connect(appConfig);

    const port = process.env.PORT || appConfig.port;
    const server = app.listen(port, () => {
        logger.info('account service started',
            { port: port });
    });
    const closeServer = () => {
        if (server) {
            //asincrono
            server.close(() => {
                logger.info('server closed');
                process.exit(1);
            });
        } else {
            process.exit(1);
        }
    };

    const unexpectedError = (error) => {
        console.error(error);
        logger.error('unhandled error', { stack: { error } });
        closeServer();
    };
    //sincrono
    process.on('uncaughtException', unexpectedError);
    process.on('unhandledRejection', unexpectedError);
}

execute();
