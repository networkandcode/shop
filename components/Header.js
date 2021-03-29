import {
    Button,
    Grid,
    Typography
} from '@material-ui/core';
import Link from 'next/link';
import { useRequireAuth } from '../hooks/useRequireAuth';

const Header = () => {
  const auth = useRequireAuth();  
  return (
    <>
        <Grid container spacing={2} style={{backgroundColor: `seashell`}}>
            <Grid item xs={12} sm={12}>
                <Typography style={{color: `#042F59`}} variant="h3" component="h1"> Marebox </Typography>
                <Typography component="p" variant="subtitle1"> Connect with the right Product/Service Experts </Typography>
                <Typography component="p" paragraph variant="subtitle2"> Find B2B {'&'} B2C businesses contact addresses, phone numbers,
user ratings and reviews </Typography>
            </Grid>            
        </Grid>
        <Grid container spacing={2} style={{backgroundColor: `pink`, color: `#042F59`, marginBottom: `10px`}}>
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
            <Link href="/user/profile"><a>
            <Typography component="h2" variant="h5">My Account</Typography>
            </a></Link>
          </Grid>
          {auth.userAuthData &&(
            <Grid item style={{textAlign: `right`}}>
              <Button color="primary" onClick={() => auth.signOut()}>
                Logout
              </Button>
            </Grid>
          )}
        </Grid>  
    </>    
)};

export default Header;