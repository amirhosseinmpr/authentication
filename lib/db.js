import { MongoClient } from 'mongodb';

export async function connectedToDatabase() {
  const client = await MongoClient.connect(
    'mongodb+srv://mpr:021URcR1zAU4b5lK@cluster1.a71j5.mongodb.net/auth?retryWrites=true&w=majority'
  );
  return client;
}
