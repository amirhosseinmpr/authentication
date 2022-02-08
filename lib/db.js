import { MongoClient } from 'mongodb';

export async function connectedToDatabase() {
  const client = await MongoClient.connect(
    'mongodb+srv://ropa:SBqNMVO6u03blaKY@cluster1.a71j5.mongodb.net/auth?retryWrites=true&w=majority'
  );
  return client;
}
