import {
  Grid,
  Typography,
  AppBar,
  Toolbar, 
  Button
} from '@material-ui/core';
import Link from 'next/link';
import Image from 'next/image';
import { useRequireAuth } from '../hooks/useRequireAuth';

const Header = () => {
  const auth = useRequireAuth();
return (
  <>
      <Grid container style={{paddingTop: `10px`, backgroundColor: `#FFFFFF`}}>
          <Grid item xs={12} sm={12}>
              <Typography style={{color: `#042F59`}} variant="h3" component="h1"> Marebox </Typography>
              <Typography style={{color: `#042F59`}} component="p" variant="subtitle1"> Connect with the right Product/Service Experts </Typography>
              <Typography style={{color: `#042F59`}} component="p" paragraph variant="subtitle2"> Find B2B {'&'} B2C businesses contact addresses, phone numbers,
user ratings and reviews </Typography>
          </Grid>   
      </Grid> 
      <AppBar position="relative" style={{backgroundColor: `#042F59`, color: `#FFFFFF`, marginBottom: `10px`}}>
      <Toolbar>
      <Grid container spacing={2} >
      <Grid item>
      <Link href="/"><a>
        <Image
      src="/mareboxwhite.png"
      alt="Logo"
      width={35}
      height={35}
    />
        </a></Link>
        </Grid>
        <Grid item>
          <Link href="/"><a>
            <Typography component="h2" variant="h5">Categories</Typography>
          </a></Link>
        </Grid>
        <Grid item>
          <Link href="/"><a>
          <Typography component="h2" variant="h5">Places</Typography>
          </a></Link>
        </Grid>
        <Grid item>
          <Link href="/directory"><a>
          <Typography component="h2" variant="h5">Directory</Typography>
          </a></Link>
        </Grid>
        <Grid item>
          <Link href="/user/profile"><a>
          <Typography component="h2" variant="h5">My Account</Typography>
          </a></Link>
        </Grid>
        </Grid>
        {auth.userAuthData &&(
            
          <Grid item style={{float: `right`}}>
            You are logged in as {auth.userAuthData.email}
            <Button style={{color: `#FFFFFF`}} onClick={() => auth.signOut()}>
              Logout
            </Button>
          </Grid>
        )}
      
          
        </Toolbar>
      </AppBar>          
     
  </>    
)};

export default Header;