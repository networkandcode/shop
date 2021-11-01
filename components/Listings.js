import EachListing from './EachListing';
import EditListing from './EditListing';
import Status from './Status';
import { useAuth } from '../hooks/useAuth';
import { db } from '../utils/firebase';
import {
    Box,
    Button,
    Grid,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Container,
    Dialog,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@material-ui/core';
import { Add,
    Close,
    DeleteForever,
    KeyboardArrowUp,
    Remove,
    WhatsApp
} from '@material-ui/icons';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Listings = ({ listings }) => {
  const router = useRouter();
  const auth = useAuth();
  //const [ listings, setListings ] = useState([]);

  /*useEffect(() => {
      const { pathname } = router;
      const { c, s } = router.query;

      if(c){
        var i = [];
        auth.listings.map(listing => {
          listing.categories && listing.categories.split(',').forEach( category => {
            if (category.trim().startsWith(c)) {
                i.push(listing);
            }
          });
        })
        setListings([...i]);
      } else if(pathname === '/directory'){
        var i = [];

        auth.listings.map(listing => {
          if (listing.categories) {
            i.push(listing);
          }
        });

        setListings([...i]);
      } else if(pathname == '/search'){
        auth.listings.map(listing => {
          if(s) {
            const searchFound = s.split().every(sTerm => {
              return Object.values(listing).join().includes(sTerm); 
            })

            if(searchFound && listing.categories) {
              i.push(listing);
            }
          } else {
            if (listing.categories) {
              i.push(listing);
            }
          }
        });
      }
  }, [auth.listings, router]);*/

  return(
    <>
      <Typography gutterBottom style={{color: `${process.env.NEXT_PUBLIC_THEME_COLOR}` }} variant="h6">
          Listings <small>({listings.length})</small>
      </Typography>
      <Grid container spacing={2}>
          {listings.map(listing => (
            <EachListing fullScreen={false} listing={listing} key={listing.id} smSize={3} xsSize={6}/>
          ))}
      </Grid>
    </>
  )
};

export default Listings;
