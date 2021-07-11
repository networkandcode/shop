import { Container} from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core';
import { useEffect, useState } from 'react';
import Copyright from '../components/Copyright';
import Head from '../components/Head';
import Header from '../components/Header';
import { AuthProvider } from '../hooks/useAuth';
import '../styles/globals.css';
import theme from '../theme';

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
    <AuthProvider>
     <Head/>
     <div>
       <div>
          <Header id="#"/>
       </div>
       <div style={{
         marginTop: `${process.env.NEXT_PUBLIC_BANNER_MARGIN_TOP}` }}>
          <Component {...pageProps}/>
          <Copyright/>
       </div>
     </div>
    </AuthProvider>
    </ThemeProvider>
  )
}

const makeStore = () => store;

export default MyApp;
