import '../styles/globals.css';
import { useEffect } from 'react';
import { AuthProvider } from '../hooks/useAuth';

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
      <Component {...pageProps} />
    </AuthProvider>
      
    
  )
}

const makeStore = () => store;

export default MyApp;