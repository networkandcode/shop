import CartAttributes from './CartAttributes';
import EditItem from './EditItem';
import ItemImage from './ItemImage';
import Status from './Status';
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
    TextField,
    Typography,
} from '@material-ui/core';
import { Add,
    Close,
    DeleteForever,
    Favorite,
    FavoriteBorder,
    Remove,
    WhatsApp
} from '@material-ui/icons';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const EachItem = (props) => {

    const auth = useAuth();
    const router = useRouter();

    const [ item, setItem ] = useState(props.item);
    const [ fav, setFav ] = useState(false);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({
        message: '',
        error: ''
    });

    const deleteItem = async() => {
        setLoading(true);
        await axios.post("/api/db", { operation: 'delete', record: item, table: 'items' })
            .then(result => {
              if(!result.data.error){
                  setStatus({ ...status, ['message']: result.data.message });
                  auth.deleteItem(item.id);
                  setItem({});
              } else{
                  setStatus({ ...status, ['error']: result.data.error });
              }
            });
    };

    const handleFavorite = e => {
        e.preventDefault();
        setFav(!fav);
        auth.updateFavs(item.id, !fav);
    };

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

    return(
      <>
        {item && item.imgURL && (
          <Grid item key={item.id} xs={props.xsSize} sm={props.smSize}>
            <Card
                style={{
                    border: `0.1px solid ${ process.env.NEXT_PUBLIC_THEME_COLOR_SEC }`,
                    borderRadius: `5px`,
                    boxShadow: `0.5px 0.5px`,
                    height: `${ props.fullScreen ? "100%" : "300" }`
                }}
            >
              <CardActionArea>
                <div style={{ textAlign: `center` }}>
                  <ItemImage item={item} mediaHt={props.mediaHt || props.fullScreen ? "50%" : "200"}/>
                </div>
              </CardActionArea>
              <CardContent>
                  <Grid container justify="space-between">
                      <Grid item xs={10}>
                          <Typography variant="body1">
                              {item.name}
                          </Typography>
                      </Grid>
                      { auth.userAuthData ? (
                      <Grid item xs={2}>
                          {fav
                              ? <Favorite
                                    style={{ color: process.env.NEXT_PUBLIC_THEME_COLOR }}
                                    onClick={handleFavorite}
                              />
                              : <FavoriteBorder
                                  onClick={handleFavorite}
                                  style={{ color: process.env.NEXT_PUBLIC_THEME_COLOR }}
                              />
                          }
                      </Grid>
                      ) : <></> }
                  </Grid>
                  <Grid container justify="space-between">
                      <Grid item>
                          <Typography variant="body1">
                              Rs. { item.price }
                          </Typography>
                          { item.mrp &&
                              item.mrp > item.price ? (
                                <Typography style={{ textDecoration: `line-through` }} variant="body2">
                                    Rs. { item.mrp }
                                </Typography>
                             ) : <></>
                          }
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
              <Container maxWidth="xs">
              <Typography gutterBottom>
                  Description: <br/>
                  {item.description}
              </Typography>
              <br/>
                  <Grid container spacing={2}>
                  {item.attributes && Object.keys(item.attributes).map(key => (
                      <Grid item key={key} xs={6}>
                        <TextField
                          fullWidth
                          label={key}
                          readOnly
                          value={item.attributes[key]}
                        />
                      </Grid>
                  ))}
                  </Grid>
                  { auth.userAuthData
                    ? <CartAttributes item={item}/>
                    : (
                      <Link href="/signin"><a>
                        <Button color="primary"> Sign in to Buy </Button>
                      </a></Link>
                    )
                  }

              </Container>
              </CardActions>
              }
            </Card>
          </Grid>
      )}
      </>
    )
}

export default EachItem;
