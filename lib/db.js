import { MongoClient } from 'mongodb';

export async function connectedToDatabase() {
  const client = await MongoClient.connect(
    'mongodb+srv://changolious:BUWF9@ua6i$j69C@cluster0.00gzi.mongodb.net/auth-demo?retryWrites=true&w=majority'
  );
  return client;
}
