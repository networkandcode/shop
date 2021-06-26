import EachItem from './EachItem';
import {
    CardMedia,
    Container,
    Dialog
} from '@material-ui/core';
import {
    Close
} from '@material-ui/icons';
import { useState } from 'react';

const ItemImage = ({item, mediaHt}) => {
  const [openDialog, setOpenDialog] = useState(false)
  return(
    <>
      <CardMedia
          alt={item.name}
          component="img"
          height={mediaHt}
          image={item.imgURL}
          onClick={() => setOpenDialog(true)}
          title={item.name}
      />
      <Dialog fullScreen onClose={() => {setOpenDialog(false)}} open={openDialog}>
          <Container maxWidth="xs">
          <Close onClick={() => { setOpenDialog(false) } }/>
          <EachItem fullScreen={true} item={item} key={item.id} smSize={12} xsSize={12}/>
          <br/>
          </Container>
      </Dialog>
    </>
  )
}

export default ItemImage;
