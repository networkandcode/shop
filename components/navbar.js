import React from 'react';
import { useRequireAuth } from '../hooks/useRequireAuth';
import {
    Toolbar,
    AppBar,
    Button,
    Typography,
    Grid
  } from '@material-ui/core';

import Link from 'next/link';
import Image from 'next/image';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

import Slide from '@material-ui/core/Slide';

function HideOnScroll(props) {
    const auth = useRequireAuth();
  const { children, window } = props;
  
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={true} direction="down" in={trigger}>
      {<AppBar style={{backgroundColor: `pink`, color: `#042F59`, marginBottom: `10px`}}>
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
            <Link href="/user/profile"><a>
            <Typography component="h2" variant="h5">My Account</Typography>
            </a></Link>
          </Grid>
          </Grid>
          {auth.userAuthData &&(
              
            <Grid item style={{float: `right`}}>
              <Button color="primary" onClick={() => auth.signOut()}>
                Logout
              </Button>
            </Grid>
          )}
        
            
          </Toolbar>
        </AppBar>}
    </Slide>
  );
}

export default HideOnScroll;
