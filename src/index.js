const path = require('path');
const db = require('./db');
const app = require('./app');
const { createConfig } = require('./config/config');

async function execute() {
    //sincrono
    const configPath = path.join(__dirname, '../configs/.env');
    //sincrono
    const appConfig = createConfig(configPath);

    await db.connect(appConfig);
    //asincrono
    const server = app.listen(appConfig.port, () => {
        console.log('account service started', { port: appConfig.port });
    });

    const closeServer = () => {
        if (server) {
            //asincrono
            server.close(() => {
                console.log('server closed');
                process.exit(1);
            });
        } else {
            process.exit(1);
        }
    };

    const unexpectedError = (error) => {
        console.log('unhandled error', { error });
        closeServer();
    };
    //sincrono
    process.on('uncaughtException', unexpectedError);
    process.on('unhandledRejection', unexpectedError);
}

execute();
