import { hashPassword, isUserValid } from '../../../helpers/auth';
import { connectToDatabase } from '../../../helpers/db';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    if (!isUserValid(email, password)) {
      res.status(422).json({ message: 'Invalid input' });
      client.close();
      return;
    }

    const client = await connectToDatabase();

    const db = client.db();

    const existingUser = await db.collection('users').findOne({ email });

    if (existingUser) {
      res.status(422).json({ message: 'User already exist.' });
      client.close();
      return;
    }

    const hashedPassword = await hashPassword(password);

    const uId = await db.collection('users').insertOne({
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: 'User Created!' });
    client.close();
  }
};

export default handler;
