import {
  Toolbar,
  AppBar,
  Button,
  Grid,
  Typography
} from '@material-ui/core';
import Link from 'next/link';
import { useRequireAuth } from '../hooks/useRequireAuth';
import Image from 'next/image';

const Header = () => {
const auth = useRequireAuth();  
return (
  <>
      <AppBar position="fixed" container  style={{backgroundColor: `pink`, color: `#042F59`, marginBottom:`10px`}}>
      <Toolbar>
        <Grid item>
          <Link href="/"><a>
          <Image
        src="/mareboxwhite.png"
        alt="Logo"
        width={57}
        height={57}
      />
          </a></Link>
        </Grid>
        <Grid item style={{marginLeft: `10px`, marginRight: `10px`}}>
        <Link href="/"><a>
            <Typography component="h2" variant="h5">Categories</Typography>
          </a></Link>
        </Grid>
        <Grid item style={{marginRight: `10px`}}>
          <Link href="/"><a>
          <Typography component="h2" variant="h5">Places</Typography>
          </a></Link>
        </Grid>
        <Grid item style={{marginRight: `690px`}}>
          <Link href="/user/profile"><a>
          <Typography component="h2" variant="h5">My Account</Typography>
          </a></Link>
        </Grid>
        {auth.userAuthData &&(
          <Grid item style={{marginLeft: `130px`}}>
            <Button color="primary" onClick={() => auth.signOut()}>
              Logout
            </Button>
          </Grid>
        )}
        
        </Toolbar>
      </AppBar>  
      <Toolbar />
  </>    
)};

export default Header;