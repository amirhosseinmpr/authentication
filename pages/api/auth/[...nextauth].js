import NextAuth from 'next-auth';
import Providers from 'next-auth/provider';

import { verifyPassword } from '../../../lib/auth';
import { connectedToDatabase } from '../../../lib/db';
export default NextAuth({
  session: {
    jwt: true,
  },
  provider: [
    Providers.credentials({
      async authorize(credentials) {
        const client = await connectedToDatabase();

        const UserCollection = client.db().collection('users');
        const user = await UserCollection.findOne({ email: credentials.email });

        if (!user) {
          client.close();
          throw new Error('no user found');
        }
        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          client.close();
          throw new Error('could not log you in!');
        }
        return { email: user.email };
      },
    }),
  ],
});
