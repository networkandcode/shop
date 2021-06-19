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
import { Alert } from '@material-ui/lab';
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
      <AppBar style={{ backgroundColor: `${process.env.NEXT_PUBLIC_THEME_COLOR}`, padding: `0.5px`}}>
      <Grid container spacing={2} >
        <Grid item xs={12}>
            <Alert severity="info">This is a demo site !!!</Alert>
        </Grid>
        <Grid item style={{ color: `${process.env.NEXT_PUBLIC_THEME_COLOR_SEC}`, textAlign: `right` }} xs={12}>
          <Link href="/"><a><Home onClick={() => {handleLinks('home')}}
            style={{backgroundColor: `${linkColor['home'] || 'inherit'}`, borderRadius: `50%`}}/></a></Link>
          {' '}
          <a href="https://api.whatsapp.com/send?phone=919500542709" target="_blank">
            <WhatsApp
            />
          </a>
          {' '}
          <a href={ process.env.NEXT_PUBLIC_YOUTUBE_URL } target="_blank"><YouTube /></a>
          {' '}
          <Link href="/f"><a><Favorite  onClick={()=>{handleLinks('favorites')}} style={{backgroundColor:`${linkColor['favorites'] || 'inherit'}`, borderRadius: `50%`}}/></a></Link>
          <small> { auth.favs.length > 0 && auth.favs.length } </small>
          <Link href="/cart"><a><ShoppingCart  onClick={()=>{handleLinks('cart')}} style={{backgroundColor: `${linkColor['cart'] || 'inherit'}`, borderRadius: `50%`}}/></a></Link>
          <small> { auth.totalPrice > 0 && `Rs. ${auth.totalPrice}` } </small>
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
              <CardContent style={{background: `${ process.env.NEXT_PUBLIC_THEME_COLOR }`, color: `${process.env.NEXT_PUBLIC_THEME_COLOR_SEC}`}}>
                  <Typography style={{ fontFamily: `Monospace`, textShadow: `1px 1px`  }} variant="h3" component="h1"> { process.env.NEXT_PUBLIC_COMPANY_NAME } </Typography>
                  <Typography component="p" paragraph variant="subtitle1"> 
                      { process.env.NEXT_PUBLIC_SUB_TITLE_1 }
                  </Typography>
                  <Typography component="p" paragraph variant="subtitle2">
                      { process.env.NEXT_PUBLIC_SUB_TITLE_2 }
                  </Typography>
              </CardContent>
            </Card>
          </Grid>
      </Grid>
      </Box>
  </>
)};

export default Header;
