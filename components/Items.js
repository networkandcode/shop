import EditItem from '../components/EditItem';
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
    Typography,
} from '@material-ui/core';
import { Add,
    Close,
    DeleteForever,
    Favorite,
    FavoriteBorder,
    KeyboardArrowUp,
    Remove,
    WhatsApp
} from '@material-ui/icons';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const ItemImage = ({item}) => {
  const [openDialog, setOpenDialog] = useState(false)
  return(
    <>
      <CardMedia
          alt={item.name}
          component="img"
          height="200"
          image={item.imgURL}
          onClick={() => setOpenDialog(true)}
          title={item.name}
      />
      <Dialog fullScreen onClose={() => {setOpenDialog(false)}} open={openDialog}>
          <Close onClick={() => { setOpenDialog(false) } }/>
          <EachItem fullScreen={true} item={item} key={item.id} smSize={12} xsSize={12}/>
      </Dialog>
    </>
  )
}

const EachItem = (props) => {
    const auth = useAuth();
    const router = useRouter();

    const [ item, setItem ] = useState(props.item);
    const [ qty, setQty ] = useState(0);
    const [ fav, setFav ] = useState(false);

    const deleteItem = async() => {
            await axios.post("/api/db", { operation: 'delete', record: item, table: 'items' })
                .then(result => {
                  if(!result.data.error){
                      auth.deleteItem(item.id);
                      setItem({});
                  }
                });
    };

    const handleChange = e => {
        e.preventDefault();
        const { id } = item;
        localStorage.setItem(id, e.target.value);
        setQty(e.target.value);
        auth.updateCartItems();
    };

    const handleFavorite = e => {
        e.preventDefault();
        setFav(!fav);
    };
    useEffect(() => {
        if(item){
            const { id } = item;
            if(id){
                setQty(localStorage.getItem(id) || 0);
            };
        };
    },[]);
    useEffect(() => {
        if(item){
            const { id } = item;
            if(auth.favs && auth.favs.includes(id)){
                if(!fav) setFav(true);
            } else {
                if(fav) setFav(false);
            }
        }
    },[]);
    useEffect(() => {
        if(item){
            const { id } = item;
            auth.updateFavs(id, fav);
        }
    },[fav]);

    return(
      <>
        {item && item.imgURL && (
          <Grid item key={item.id} xs={props.xsSize} sm={props.smSize}>
            <Card
                style={{
                    border: `0.1px solid ${ process.env.NEXT_PUBLIC_THEME_COLOR_SEC }`,
                    borderRadius: `5px`,
                    boxShadow: `0.5px 0.5px`,
                    height: `300px`
                }}
            >
              <CardActionArea>
                <div style={{ textAlign: `center` }}>
                  <ItemImage item={item}/>
                </div>
              </CardActionArea>
              <CardContent>
                  <Grid container justify="space-between">
                      <Grid item xs={10}>
                          <Typography variant="body1">
                              {item.name}
                          </Typography>
                      </Grid>
                      <Grid item xs={2}>
                          {fav
                              ? <Favorite
                                    style={{color: process.env.NEXT_PUBLIC_THEME_COLOR }}
                                    onClick={handleFavorite}
                              />
                              : <FavoriteBorder
                                  onClick={handleFavorite}
                                  style={{color: process.env.NEXT_PUBLIC_THEME_COLOR }}
                              />
                          }
                      </Grid>
                  </Grid>
                  <Grid container justify="space-between">
                      <Grid item>
                          <Typography variant="body1">
                              Rs. { item.price }
                          </Typography>
                      </Grid>
                      <Grid item>
                          {auth.userAuthData && (
                              <>
                                  <EditItem item={item}/>
                                  <DeleteForever color="disabled" onClick={deleteItem}/>
                              </>
                          )}
                      </Grid>
                  </Grid>
              </CardContent>
              {props.fullScreen &&
              <CardActions>
                <Grid container>
                  <Grid item xs={12}>
                          <Typography gutterBottom variant="body2" color="textSecondary">
                              Description: { item.description }
                          </Typography>
                          <FormControl fullWidth margin="normal" required>
                            <InputLabel id="qtyLabel">quantity</InputLabel>
                            <Select
                              id="qtyId"
                              labelId="qtyLabel"
                              onChange={handleChange}
                              value={ qty }
                            >
                              <MenuItem value={0}>0</MenuItem>
                              <MenuItem value={1}>1</MenuItem>
                              <MenuItem value={2}>2</MenuItem>
                              <MenuItem value={3}>3</MenuItem>
                              <MenuItem value={4}>4</MenuItem>
                              <MenuItem value={5}>5</MenuItem>
                            </Select>
                          </FormControl>
                          {item.attributes && Object.keys(item.attributes).map(key => (
                              <FormControl fullWidth key={key} margin="normal" required>
                                <InputLabel id={`${key}Label`}>{key}</InputLabel>
                                <Select
                                  id={`${key}Select`}
                                  labelId={`${key}Label`}
                                  onChange={handleChange}
                                >
                                  {item.attributes[key].map( i => (
                                      <MenuItem key={i} value={i}>{i}</MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                          ))}
                  </Grid>
                </Grid>
              </CardActions>
              }
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
        var i = [];
        auth.items.map(item => {
            if (item.category.startsWith(c)) {
                i.push(item);
            }
        })
        setItems(i);
      }
  }, [auth, router]);

  return (
    <div>
      <Typography gutterBottom style={{color: `${process.env.NEXT_PUBLIC_THEME_COLOR}` }} variant="h6">
          Items <small>({items.length})</small>
      </Typography>
      <Grid container spacing={2} style={{backgroundColor: `#FFFFFF`}}>
          {items.map(item => (
            <EachItem fullScreen={false} item={item} key={item.id} smSize={3} xsSize={6}/>
          ))}
      </Grid>
    </div>
  );
};

export default items;
