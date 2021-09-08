import { getSession } from 'next-auth/client';
import AuthForm from '../components/auth/AuthForm';

const AuthPage = () => {
  return <AuthForm />;
};

// protected Page - needs to not bet authenticated - managed with useSession
export const getServerSideProps = async (context) => {
  const { req } = context;

  const session = await getSession({ req });

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};

export default AuthPage;
