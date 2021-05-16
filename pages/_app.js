import { Box, Container} from '@material-ui/core';
import { useEffect } from 'react';
import Copyright from '../components/Copyright';
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
     <Container>
        <Header id="#"/>
     </Container>
     <Container>
        <Component {...pageProps}/>
        <Box mt={2}>
          <br/>
          <Copyright/>
        </Box>
     </Container>
    </AuthProvider>    
  )
}

const makeStore = () => store;

export default MyApp;
