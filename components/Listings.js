import EachListing from './EachListing';
import EditItem from './EditItem';
import Status from './Status';
import { db } from '../utils/firebase';
import { useAuth } from '../hooks/useAuth';
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

const Listings = (props) => {
  const router = useRouter();
  const auth = useAuth();
  const [ items, setItems ] = useState([]);
  const [ refresh, setRefresh ] = useState(false);

  useEffect(() => {
      const { c } = router.query;

      if(c){
        var i = [];
        auth.listings.map(item => {
            if (item.category.startsWith(c)) {
                i.push(item);
            }
        })
        setItems([...i]);
      }
  }, [auth.listings, router]);

  return (
    <div>
      <Typography gutterBottom style={{color: `${process.env.NEXT_PUBLIC_THEME_COLOR}` }} variant="h6">
          Listings <small>({items.length})</small>
      </Typography>
      <Grid container spacing={2}>
          {items.map(item => (
            <EachListing fullScreen={false} listing={item} key={item.id} smSize={3} xsSize={6}/>
          ))}
      </Grid>
    </div>
  );
};

export default Listings;
