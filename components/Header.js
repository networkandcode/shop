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
)};

export default Header;
