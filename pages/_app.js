import { Box, Container} from '@material-ui/core';
import { useEffect } from 'react';
import style from '../styles/Home.module.css';
import Copyright from '../components/Copyright';
import Header from '../components/Header';
import Banner from '../components/banner'
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
      <Header/>   
        <Banner/> 
        <Component {...pageProps} />
        <Box mt={2}>
          <Copyright/>
        </Box>
        
    </AuthProvider>    
  )
}

const makeStore = () => store;

export default MyApp;