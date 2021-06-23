import { Box, Container} from '@material-ui/core';
import { useEffect } from 'react';
import Copyright from '../components/Copyright';
import Head from '../components/Head';
import Header from '../components/Header';
import { AuthProvider } from '../hooks/useAuth';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  return (
    <AuthProvider>
     <Head/>
     <div>
       <div>
          <Header id="#"/>
       </div>
       <div style={{ marginTop: `90px` }}>
          <Component {...pageProps}/>
          <Box mt={2}>
            <br/>
            <Copyright/>
          </Box>
       </div>
     </div>
    </AuthProvider>
  )
}

const makeStore = () => store;

export default MyApp;
