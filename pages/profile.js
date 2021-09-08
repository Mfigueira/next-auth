import { getSession } from 'next-auth/client';
import UserProfile from '../components/profile/UserProfile';

const ProfilePage = () => {
  return <UserProfile />;
};

// protected Page - needs authentication - managed with useSession
export const getServerSideProps = async (context) => {
  const { req } = context;

  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};

export default ProfilePage;
