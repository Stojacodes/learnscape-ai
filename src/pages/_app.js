import { Global } from '@emotion/react';
import { globalStyles } from '../styles/globalStyles'; // Updated import path

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Global styles={globalStyles} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;

