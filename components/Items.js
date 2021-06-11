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
    const [ fav, setFav ] = useState(false);

    const deleteItem = async(item) => {
        await auth.deleteItem(item).then((resp) => {
            setItem({});
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
          <Grid item key={item.id} xs={6} sm={4}>
            <Card>
              <CardActionArea>
                <ItemImage item={item}/>
              </CardActionArea>
              <CardContent>
                    <Grid container justify="space-between">
                        <Grid item xs={8}>
                <Typography variant="body1">

                            {item.name}  {' '}
                </Typography>

                        </Grid>
                        <Grid item style={{ textAlign: `right` }} xs={4}>
                            { fav ? <Favorite style={{color: `pink`}} onClick={handleFavorite}/> : <FavoriteBorder onClick={handleFavorite} style={{color: `pink`}}/> }
                        </Grid>
                    </Grid>
                  <Grid container justify="space-between">
                      <Grid item xs={8}>
                <Typography variant="body2" color="textSecondary">

                          { item.description }
                </Typography>
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
              </CardContent>
              <CardActions>
                <Grid container justify="space-between">
                  <Grid item>
                      Rs.{item.price}
                  </Grid>
                  <Grid item>
                    {auth.userAuthData && (
                        <>
                            <EditItem item={item}/>
                            <DeleteForever color="disabled" onClick={() => deleteItem(item)}/>
                        </>
                    )}
                    {' '}
                    <a target="_blank" href={`https://api.whatsapp.com/send?phone=919500542709&text=Hi, I am interested in ${item.name} listed for Rs.${item.price} at https://safamarwa.store, item image: ` + encodeURIComponent(item.imgURL)}><WhatsApp/></a>
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
            if (item.category === c) {
                i.push(item);
            }
        })
        setItems(i);
      }
  }, [auth, router]);
  return (
    <div>
      <Typography gutterBottom style={{color: `dimgray`}} variant="h6">
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
