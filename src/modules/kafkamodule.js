const { Kafka } = require('kafkajs');
const Account = require('../models/account');
const path = require('path');
const { createConfig } = require('../config/config');

const configPath = path.join(__dirname, '../../configs/.env');
const appConfig = createConfig(configPath);
const kafka = new Kafka({
  clientId: appConfig.kafka.clientId,
  brokers: [appConfig.kafka.brokers],
});

const consumer = kafka.consumer({ groupId: appConfig.kafka.groupId });

const consumerModule = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: appConfig.kafka.topic });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const transaction = JSON.parse(message.value.toString());
      const accountId = transaction.accountId;

      try {
        const blockedAccount = await Account.findOne({ accountId, status: 'blocked' });
        if (!blockedAccount) {
          // Si la cuenta no está bloqueada, intentamos actualizar o crear el contador de fraude
          const updatedAccount = await Account.findOneAndUpdate(
            { id: accountId },
            { $inc: { count: 1 } },
            { new: true }
          );
          console.log(blockedAccount);

          if (updatedAccount.count === 3) {
            // Si el contador llega a 3, bloqueamos la cuenta
            await Account.findOneAndUpdate(
              { id: accountId },
              { status: 'blocked' },
              { new: true }
            );
          }
        } else {
          console.log(`not a valid accountId ${accountId}`);
        }
      } catch (error) {
        console.log(error);
      }
    },
  });
};

module.exports = consumerModule;