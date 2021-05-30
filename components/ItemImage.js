import { db } from '../utils/firebase';
import { useAuth } from '../hooks/useAuth';
import {
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
  InputLabel,
  MenuItem,
  Select,
  Typography, 
} from '@material-ui/core';
import { Add, Close, DeleteForever, FavoriteBorder, KeyboardArrowUp, Remove, ShoppingCart, WhatsApp } from '@material-ui/icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const ItemImage = ({item}) => {
  const [openDialog, setOpenDialog] = useState(false)
  return(
    <>
      <CardMedia
        component="img"
        alt={item.slug}
        height={150}
        image={item.imgURL || "https://source.unsplash.com/weekly?water"}
        onClick={() => setOpenDialog(true)}
        title={item.name}
      />
      <Dialog fullScreen onClose={() => {setOpenDialog(false)}} open={openDialog}>
          <Close onClick={() => { setOpenDialog(false) } }/>
          <img
              src={item.imgURL || "https://source.unsplash.com/weekly?water"}
              style={{ height: `auto`, maxWidth: `100%` }}
          />
      </Dialog>
    </>
  )
}

export default ItemImage;
