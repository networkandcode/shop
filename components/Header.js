import {
  AppBar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Button
} from '@material-ui/core';
import {
  Favorite,
  Home,
  PowerSettingsNew,
  ShoppingCart,
  WhatsApp,
  YouTube
} from '@material-ui/icons';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const Header = () => {
  const auth = useAuth();
  const [linkColor, setLinkColor] = useState({});
  const handleLinks = (linkName) => {
    setLinkColor({[linkName]: "hotpink"})
  }
return (
  <>
      <AppBar style={{backgroundColor: `dimgray`, padding: `0.5px`}}>
      <Grid container spacing={2} >
        <Grid item style={{ color: `white`, textAlign: `right` }} xs={12}>
          <Link href="/"><a><Home onClick={() => {handleLinks('home')}}
            style={{backgroundColor: `${linkColor['home'] || 'inherit'}`, borderRadius: `50%`}}/></a></Link>
          {' '}
          <a href="https://api.whatsapp.com/send?phone=919500542709" target="_blank">
            <WhatsApp
            />
          </a>
          {' '}
          <a href="https://youtube.com/c/SafaMarwaNihal" target="_blank"><YouTube /></a>
          {' '}
          <Link href="/f"><a><Favorite  onClick={()=>{handleLinks('favorites')}} style={{backgroundColor:`${linkColor['favorites'] || 'inherit'}`, borderRadius: `50%`}}/></a></Link>
          {' '}
          <Link href="/cart"><a><ShoppingCart  onClick={()=>{handleLinks('cart')}} style={{backgroundColor: `${linkColor['cart'] || 'inherit'}`, borderRadius: `50%`}}/></a></Link>
        {auth.userAuthData &&(
              <PowerSettingsNew  onClick={() => auth.signOut()}/>
        )}
        </Grid>
      </Grid>
      </AppBar>
      <Box mt={3}>
      <Grid container>
          <Grid item xs={12} sm={12}>
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="shopping"
                  height="150"
                  image="https://source.unsplash.com/featured/?shopping"
                  title="shopping"
                />
              </CardActionArea>
              <CardContent style={{background: `dimgray`, color: `white`}}>
                <Typography style={{ fontFamily: `Monospace`, textShadow: `1px 1px`  }} variant="h3" component="h1"> Safa Marwa </Typography>
                <Typography component="p" variant="subtitle1"> Welcome to our website. </Typography>
                <Typography component="p" paragraph variant="subtitle2"> We sell Men, Women and Kids clothing, Household products, accessories etc. </Typography>
                <Typography component="p" paragraph variant="subtitle2"> <strong> COD is available in Nagercoil and Trivandrum. </strong> </Typography>
              </CardContent>
            </Card>
          </Grid>
      </Grid>
      </Box>
  </>
)};

export default Header;
