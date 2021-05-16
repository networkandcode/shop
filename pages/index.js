import {
  Grid, 
  Card, 
  CardActionArea, 
  CardActions,
  Typography, 
  CardContent, 
  CardMedia 
} from '@material-ui/core';
import { DeleteForever, KeyboardArrowUp, WhatsApp } from '@material-ui/icons';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { db } from '../utils/firebase';
import { useAuth } from '../hooks/useAuth';

const ItemImage = ({item}) => {
  return(
    <>
    <CardMedia
      component="img"
      alt={item.slug}
      height="150"                
      image={item.imgURL || "https://source.unsplash.com/weekly?water"}
      title={item.name}
    />
    </>
  )
}

const EachItem = (props) => {
    const auth = useAuth();
    const [ item, setItem ] = useState(props.item)
    const deleteItem = async({id}) => {
        await auth.deleteItem(id)
        setItem({})
    };
    return(
      <>
        {item && item.imgURL && (
          <Grid item key={item.id} xs={12} sm={4}>
            <Card>
              <CardActionArea>  
                <ItemImage item={item}/>                          
              </CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h6" component="h3">                              
                {item.category} {' > '} {item.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p"> 
                  { item.description }
                </Typography>
              </CardContent>
              <CardActions>
                <Grid container>
                  <Grid item xs={9}>
                    <a target="_blank" href={`https://api.whatsapp.com/send?phone=919500542709&text=Hi, I am interested in ${item.name} listed for Rs.${item.price} at https://www.safamarwa.store`}>Rs.{item.price}</a>              
                  </Grid>
                  <Grid item xs={3}>
                    <a target="_blank" href={`https://api.whatsapp.com/send?phone=919500542709&text=Hi, I am interested in ${item.name} listed for Rs.${item.price} at https://www.safamarwa.store`}><WhatsApp/></a>              
                    {auth.userAuthData && (<DeleteForever onClick={() => deleteItem(item)}/>)}
                    <a href="#"> <KeyboardArrowUp/> </a>
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
  const { itemsData } = props;  
  const [ refresh, setRefresh ] = useState(false);

  return (
    <>
      <Grid container spacing={2} style={{backgroundColor: `#FFFFFF`}}>
      {itemsData.map(item => (
        <EachItem item={item}/>
      ))}
      </Grid>
      
    </>
  );
};

export const getServerSideProps = async () => {
  const items = await db.collection('items').orderBy('name').get();
  var itemsData = items.docs.map(item => ({
    id: item.id,
    ...item.data()
  }));
  return {
    props: { itemsData }
  }
}

export default items;
