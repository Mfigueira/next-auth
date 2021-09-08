import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { arePasswordsEqual } from '../../../helpers/auth';
import { connectToDatabase } from '../../../helpers/db';

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const { email, password } = credentials;
        const client = await connectToDatabase();

        const usersCollection = client.db().collection('users');

        const user = await usersCollection.findOne({ email });

        if (!user) {
          client.close();
          throw new Error('No user found.');
        }

        const isPasswordValid = await arePasswordsEqual(
          password,
          user.password
        );

        if (!isPasswordValid) {
          client.close();
          throw new Error('Invalid Password.');
        }

        client.close();

        // the object returned by authorize() will be encoded into the JWT
        return { email };
      },
    }),
  ],
});
