import {
  Grid,
  Typography,
  Button
} from '@material-ui/core';
import {
  Home,
  PowerSettingsNew,
  WhatsApp,
  YouTube
} from '@material-ui/icons';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '../hooks/useAuth';

const Header = () => {
  const auth = useAuth();
return (
  <>
      <Grid container style={{paddingTop: `10px`, backgroundColor: `#042F59`, color: `#ffffff`}}>
          <Grid item xs={12} sm={12}>
              <Typography style={{ fontFamily: `Monospace`  }} variant="h3" component="h1"> Safa Marwa </Typography>
              <Typography component="p" variant="subtitle1"> Welcome to our website. </Typography>
              <Typography component="p" paragraph variant="subtitle2"> We sell Men, Women and Kids clothing, Household products, accessories etc. </Typography>
          </Grid>   
      </Grid> 
      <Grid container spacing={2} >
        <Grid item xs={8}>          
          <Typography style={{color: `white`}} component="p" paragraph variant="subtitle2"> <strong> COD is available in Nagercoil and Trivandrum. </strong> </Typography>
        </Grid>
        <Grid item style={{ color: `white` }} xs={4}>          
          <Link href="/"><a><Home/></a></Link>
          {' '}          
          <a href="https://api.whatsapp.com/send?phone=919500542709" target="_blank"><WhatsApp/></a>          
          {' '}
          <a href="https://youtube.com/c/SafaMarwaNihal" target="_blank"><YouTube/></a>          
          {' '}
        {auth.userAuthData &&(            
              <PowerSettingsNew onClick={() => auth.signOut()}/>
        )}
        </Grid>
      </Grid>             
  </>    
)};

export default Header;
