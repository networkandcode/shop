import {
  Grid,
  Typography,
  AppBar,
  Toolbar, 
  Button
} from '@material-ui/core';
import {
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
      <Grid container style={{paddingTop: `10px`, backgroundColor: `#FFFFFF`}}>
          <Grid item xs={12} sm={12}>
              <Typography style={{color: `#042F59`}} variant="h3" component="h1"> Safa Marwa </Typography>
              <Typography style={{color: `#042F59`}} component="p" variant="subtitle1"> Welcome to our website. </Typography>
              <Typography style={{color: `#042F59`}} component="p" paragraph variant="subtitle2"> We sell Men, Women and Kids clothing, Household products, accessories etc. </Typography>
          </Grid>   
      </Grid> 
      <Toolbar position="relative" style={{backgroundColor: `#042F59`, color: `#FFFFFF`, marginBottom: `10px`}}>
      <Grid container spacing={2} >
        <Grid item xs={9}>          
          <Typography style={{color: `white`}} component="p" paragraph variant="subtitle2"> <strong> COD is available in Nagercoil and Trivandrum. </strong> </Typography>
        </Grid>
        <Grid item xs={3}>          
          <a href="https://api.whatsapp.com/send?phone=919500542709" target="_blank"><WhatsApp/></a>          
          <a href="https://youtube.com/c/SafaMarwaNihal" target="_blank"><YouTube/></a>          
        {auth.userAuthData &&(            
              <PowerSettingsNew onClick={() => auth.signOut()}/>
        )}
        </Grid>
      </Grid>        
        </Toolbar>
     
  </>    
)};

export default Header;
