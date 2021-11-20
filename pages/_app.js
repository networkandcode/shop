import Copyright from '../components/Copyright';
import Head from '../components/Head';
import Header from '../components/Header';
import { AuthProvider } from '../hooks/useAuth';
import '../styles/globals.css';
import theme from '../theme';
import { Box, Container, ThemeProvider } from '@material-ui/core';
import { useEffect, useState } from 'react';

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
       <Box pt={12}>
          <Component {...pageProps}/>
          <Copyright/>
       </Box>
     </div>
    </AuthProvider>
    </ThemeProvider>
  )
}

const makeStore = () => store;

export default MyApp;
