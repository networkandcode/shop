import EditItem from '../components/EditItem';
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
    WhatsApp
} from '@material-ui/icons';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const ItemImage = ({item}) => {
  const [openDialog, setOpenDialog] = useState(false)
  return(
    <>
      <img alt={ item.name } onClick={() => setOpenDialog(true)} src={item.imgURL || "https://source.unsplash.com/weekly?water"} style={{ maxHeight: `150px` }}/>
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
          <Grid item key={item.id} xs={6} sm={3}>
            <Card style={{ border: `0.1px solid ${ process.env.NEXT_PUBLIC_THEME_COLOR }`, borderRadius: `5px`, boxShadow: `2px 2px`, height: `350px` }}>
              <CardActionArea>
                <div style={{ textAlign: `center` }}>
                  <ItemImage item={item}/>
                </div>
              </CardActionArea>
              <CardContent>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography variant="body1">
                                {item.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                      { item.description }
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                      { item.category.split('/').join(' >> ') }
                            </Typography>
                        </Grid>
                    </Grid>
                    <br/>
                    <Grid alignItems="center" container justify="space-between">
                        <Grid item>
                            <Typography>
                                Rs. { item.price }
                            </Typography>
                        </Grid>
                        <Grid item>
                          <FormControl>
                            <Select
                              onChange={handleChange}
                              style={{ height: `20px` }}
                              value={ qty }
                              variant="outlined"
                            >
                              <MenuItem value={0}>0</MenuItem>
                              <MenuItem value={1}>1</MenuItem>
                              <MenuItem value={2}>2</MenuItem>
                              <MenuItem value={3}>3</MenuItem>
                              <MenuItem value={4}>4</MenuItem>
                              <MenuItem value={5}>5</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                    </Grid>
              </CardContent>
              <CardActions>
                <Grid container>
                  <Grid item style={{textAlign: `right`}} xs={12}>
                    {auth.userAuthData && (
                        <>
                            <EditItem item={item}/>
                            <DeleteForever color="disabled" onClick={deleteItem}/>
                        </>
                    )}
                    { fav ? <Favorite style={{color: `pink`}} onClick={handleFavorite}/> : <FavoriteBorder onClick={handleFavorite} style={{color: `pink`}}/> }
                    <a target="_blank" href={`https://api.whatsapp.com/send?phone=919500542709&text=Hi, I am interested in ${item.name} listed for Rs.${item.price} at https://${process.env.NEXT_PUBLIC_MY_DOMAIN}, item image: ` + encodeURIComponent(item.imgURL)}><WhatsApp color="disabled"/></a>
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
            <EachItem key={item.id} item={item}/>
          ))}
      </Grid>
    </div>
  );
};

export default items;
