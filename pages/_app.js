import { Provider as SessionProvider } from 'next-auth/client';
import Layout from '../components/layout/Layout';
import '../styles/globals.css';

const App = ({ Component, pageProps }) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
};

export default App;
