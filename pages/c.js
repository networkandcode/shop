import { db } from '../utils/firebase';
import { useAuth } from '../hooks/useAuth';
import {
  Button,
  Grid, 
  Card, 
  CardActionArea, 
  CardActions,
  Container,
  Typography, 
  CardContent, 
  CardMedia,
  Dialog,
} from '@material-ui/core';
import { Close, DeleteForever, KeyboardArrowUp, WhatsApp } from '@material-ui/icons';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const ItemImage = ({item}) => {
  const [openDialog, setOpenDialog] = useState(false)
  return(
    <>
      <CardMedia
        component="img"
        alt={item.slug}
        height="150"
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

const EachItem = (props) => {
    const auth = useAuth();
    const [ item, setItem ] = useState(props.item)
    const deleteItem = async(item) => {
        await auth.deleteItem(item).then((resp) => {
            setItem({})
        });
    };
    return(
      <>
        {item && item.imgURL && (
          <Grid item key={item.id} xs={6} sm={4}>
            <Card>
              <CardActionArea>  
                <ItemImage item={item}/>                          
              </CardActionArea>
              <CardContent>
                <Typography variant="body1" component="p">                              
                {item.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p"> 
                  { item.description }
                </Typography>
              </CardContent>
              <CardActions>
                <Grid container>
                  <Grid item xs={6}>
                      Rs.{item.price}
                  </Grid>
                  <Grid item style={{textAlign: `right`}} xs={6}>
                    <a target="_blank" href={`https://api.whatsapp.com/send?phone=919500542709&text=Hi, I am interested in ${item.name} listed for Rs.${item.price} at https://safamarwa.store, item image: ` + encodeURIComponent(item.imgURL)}><WhatsApp/></a>
                    {auth.userAuthData && (<DeleteForever onClick={() => deleteItem(item)}/>)}
                    <a href="#"> <KeyboardArrowUp color="disabled"/> </a>
                  </Grid>
                </Grid>
              </CardActions>
            </Card>         
          </Grid>
      )}
      </>
    )
}

const items = (props) => {
  const router = useRouter();
  const auth = useAuth();
  const [ items, setItems ] = useState([]);
  const [ refresh, setRefresh ] = useState(false);
  useEffect(() => {
      const { c } = router.query;
      if(c){
        setItems(auth.items.map(item => { 
            if (item.category === c) {
                return item; 
            }
        }))
      }
  }, [auth, router]);
  return (
    <Container mt={0}>
    <Grid container spacing={2} style={{backgroundColor: `#FFFFFF`}}>
        {items.map((item, idx) => (
          <EachItem key={idx} item={item}/>
        ))}
    </Grid>
    </Container>
  );
};

export default items;
