import { connectedToDatabase } from '../../../lib/db';
import { hashPassword } from '../../../lib/auth';
async function Handler(req, res) {
  if (req.method !== 'POST') {
    return;
  }
  const data = req.body;
  const { email, password } = data;

  if (
    !email ||
    !email.includes('@') ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({
      message:
        'Invalid input - password should also be at least 7 characters long.',
    });
    return;
  }

  const client = await connectedToDatabase();
  const db = client.db();

  const existing = await db.collection('users').findOne({ email: email });
  if (existing) {
    res.status(422).json({ message: 'existing!' });
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(password);

  const result = await db
    .collection('users')
    .insertOne({ email: email, password: hashedPassword });

  res.status(201).json({ message: 'Created user ' });
  return result;
}

export default Handler;
