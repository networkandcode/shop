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
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const EachItem = (props) => {
    const auth = useAuth();
    const router = useRouter();

    const cartAttributes = props.item.cartAttributes || {};
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

    const handleChange = e => {
        e.preventDefault();
        const {name, value} = e.target;
        setItem({
          ...item,
          cartAttributes:{...cartAttributes, [name]: value}
        });
    };

    const handleFavorite = e => {
        e.preventDefault();
        setFav(!fav);
        auth.updateFavs(item.id, !fav);
    };

    const onSubmit = async(e) => {
        e.preventDefault();
        const email = auth.userAuthData.email;
        const hash = email + item.id;
        const record = {...item, cartAttributes, email, hash};

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

        auth.updateCartItems(record);
    }

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
                  <ItemImage item={item} mediaHt={props.fullScreen ? "50%" : "200"}/>
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
                                    style={{ color: process.env.NEXT_PUBLIC_THEME_COLOR }}
                                    onClick={handleFavorite}
                              />
                              : <FavoriteBorder
                                  onClick={handleFavorite}
                                  style={{ color: process.env.NEXT_PUBLIC_THEME_COLOR }}
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
              <Container maxWidth="xs">
                <form onSubmit={onSubmit}>
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

                  <Grid container spacing={2}>

                    {item.varAttributes && Object.keys(item.varAttributes).map(key => (
                        <Grid item key={key} xs={6}>
                        <FormControl fullWidth margin="normal" required>
                          <InputLabel id={`${key}Label`}>{key}</InputLabel>
                          <Select
                            id={`${key}Select`}
                            labelId={`${key}Label`}
                            name={key}
                            onChange={handleChange}
                            value={cartAttributes[key] || ''}
                          >
                            {item.varAttributes[key].map( i => (
                                <MenuItem key={i} value={i}>{i}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        </Grid>
                    ))}

                    <Grid item xs={6}>
                      <FormControl fullWidth margin="normal" required>
                        <InputLabel id="qtyLabel">Quantity</InputLabel>
                        <Select
                          id="qtyId"
                          labelId="qtyLabel"
                          name="qty"
                          onChange={handleChange}
                          value={ cartAttributes['qty'] }
                        >
                          {[0, 1, 2, 3, 4, 5].map(i => (
                            <MenuItem key={i} value={i}> {i} </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>

                  </Grid>
                <Status loading={loading} status={status}/>
                <br/>
                <small>Note: Setting quantity to 0 removes the item from cart.</small>
                <br/><br/>
                <Button
                  color="primary"
                  fullWidth
                  margin="normal"
                  type="submit"
                  variant="contained"
                >
                  Update Cart
                </Button>
                </form>
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
