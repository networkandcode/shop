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
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    Typography,
} from '@material-ui/core';
import { Add,
    Close,
    DeleteForever,
    Favorite,
    FavoriteBorder,
    KeyboardArrowUp,
    Remove,
    ShoppingCart,
    WhatsApp
} from '@material-ui/icons';
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
    const router = useRouter();

    const [ item, setItem ] = useState(props.item);
    const [ qty, setQty ] = useState(0);
    const [ fav, setFav ] = useState(true);

    const deleteItem = async(item) => {
        await auth.deleteItem(item).then((resp) => {
            setItem({});
        });
    };
    const handleChange = e => {
        e.preventDefault();
        const { id } = item;
        if(e.target.value > 0){
            localStorage.setItem(id, e.target.value);
            setQty(e.target.value);
        }
        auth.updateCartItems();
    };
    const rmFav = e => {
        e.preventDefault();
        const { id } = item;
        setFav(false);
        auth.updateFavs(id, false);
    };
    useEffect(() => {
        if(item){
            const { id } = item;
            if(id){
                setQty(localStorage.getItem(id) || 0);
            };
        };
    },[]);

    return(
      <>
        {fav && item && item.imgURL && (
          <Grid item key={item.id} xs={6} sm={4}>
            <Card>
              <CardActionArea>
                <ItemImage item={item}/>
              </CardActionArea>
              <CardContent>
                  <Typography variant="body1" component="p">
                      <Grid container justify="space-between">
                          <Grid item xs={8}>
                              {item.name}  {' '}
                          </Grid>
                          <Grid item style={{ textAlign: `right` }} xs={4}>
                              { fav ? <Favorite style={{color: `pink`}} onClick={rmFav}/> : <FavoriteBorder onClick={rmFav}/> }
                          </Grid>
                      </Grid>
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                      <Grid container justify="space-between">
                          <Grid item xs={8}>
                              { item.description }
                          </Grid>
                          <Grid item style={{ textAlign: `right` }} xs={4}>
                              <FormControl>
                                <select
                                  onChange={handleChange}
                                  value={ qty }
                                >
                                  <option value={0}>0</option>
                                  <option value={1}>1</option>
                                  <option value={2}>2</option>
                                  <option value={3}>3</option>
                                  <option value={4}>4</option>
                                  <option value={5}>5</option>
                                </select>
                              </FormControl>
                          </Grid>
                      </Grid>
                  </Typography>
              </CardContent>
              <CardActions>
                <Grid container justify="space-between">
                  <Grid item>
                      Rs.{item.price}
                  </Grid>
                  <Grid item style={{ textAlign: `right`, float: `right` }}>
                    {auth.userAuthData && (<DeleteForever onClick={() => deleteItem(item)}/>)}                    
                    {' '}
                    <a target="_blank" href={`https://api.whatsapp.com/send?phone=919500542709&text=Hi, I am interested in ${item.name} listed for Rs.${item.price} at https://safamarwa.store, item image: ` + encodeURIComponent(item.imgURL)}><WhatsApp/></a>
                    {' '}
                    <Link href="/cart"><a><ShoppingCart/></a></Link>
                    {' '}
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

const Favorites = (props) => {
    const router = useRouter();
    const auth = useAuth();
    const [ items, setItems ] = useState([]);
    const [ refresh, setRefresh ] = useState(false);

  return (
    <Container mt={0}>
    <Grid container spacing={2} style={{backgroundColor: `#FFFFFF`}}>
        {auth.items.map((item, idx) => (
          auth.favs.includes(item.id) && <EachItem key={idx} item={item}/>
        ))}
    </Grid>
    </Container>
  );
};

export default Favorites;
