import { Toaster } from 'react-hot-toast';
import NextHead from '../components/NextHead';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
    <NextHead />
      <Component {...pageProps} />
      <Toaster />
    </>
  );
}

export default MyApp;
