import { getSession } from 'next-auth/client';
import { connectToDatabase } from '../../../helpers/db';
import { arePasswordsEqual, hashPassword } from '../../../helpers/auth';

const handler = async (req, res) => {
  if (req.method !== 'PATCH') return;

  const session = await getSession({ req });

  if (!session) {
    res.status(401).json({ message: 'Unauthorized user.' });
    return;
  }

  const { email } = session.user;
  const { oldPassword, newPassword } = req.body;

  const client = await connectToDatabase();

  const usersCollection = client.db().collection('users');

  const user = await usersCollection.findOne({ email });

  if (!user) {
    client.close();
    res.status(404).json({ message: 'User not found.' });
    return;
  }

  const currentPassword = user.password;

  const passwordsAreEqual = await arePasswordsEqual(
    oldPassword,
    currentPassword
  );

  if (!passwordsAreEqual) {
    client.close();
    res.status(403).json({ message: 'Invalid password.' });
    return;
  }

  const hashedPassword = await hashPassword(newPassword);

  await usersCollection.updateOne(
    { email },
    { $set: { password: hashedPassword } }
  );

  client.close();
  res.status(200).json({ message: 'Password updated!' });
};

export default handler;
