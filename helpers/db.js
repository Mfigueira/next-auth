import { MongoClient } from 'mongodb';

export const connectToDatabase = async () =>
  await MongoClient.connect(process.env.MONGODB_CONNECTION_STRING);
