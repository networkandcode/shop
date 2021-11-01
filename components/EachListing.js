import EditListing from './EditListing';
import ListingImage from './ListingImage';
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
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Add,
    Close,
    DeleteForever,
    Favorite,
    FavoriteBorder,
    Phone,
    Remove,
    WhatsApp
} from '@material-ui/icons';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const useStyles = makeStyles(theme => ({
    input: {
      color: process.env.NEXT_PUBLIC_THEME_COLOR
    },
    label: {
      color: process.env.NEXT_PUBLIC_THEME_COLOR
    }
}));

const EachListing = (props) => {
    const classes = useStyles();
    const auth = useAuth();
    const router = useRouter();
    const [ listing, setListing ] = useState(props.listing);
    const [ fav, setFav ] = useState(false);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({
        message: '',
        error: ''
    });

    const deleteListing = async() => {
        setLoading(true);
        await axios.post("/api/db", { operation: 'delete', record: listing, table: 'listings' })
            .then(result => {
              if(!result.data.error){
                  setStatus({ ...status, ['message']: result.data.message });
                  auth.deleteListing(listing.id);
                  setListing({});
              } else{
                  setStatus({ ...status, ['error']: result.data.error });
              }
            });
    };

    const handleFavorite = e => {
        e.preventDefault();
        setFav(!fav);
        auth.updateFavs(listing.id, !fav);
    };

    useEffect(() => {
        if(listing){
            const { id } = listing;
            if(auth.favs && auth.favs.includes(id)){
                if(!fav) setFav(true);
            } else {
                if(fav) setFav(false);
            }
        }
    },[]);

    return(
      <>
        {listing && (
          <Grid item key={listing.id} xs={props.xsSize} sm={props.smSize}>
            <Card
                style={{
                    backgroundColor: `${auth.themeBgColor}`,
                    color: `${auth.themeColor}`,
                    border: `0.1px solid ${ process.env.NEXT_PUBLIC_THEME_COLOR_SEC }`,
                    borderRadius: `5px`,
                    boxShadow: `0.5px 0.5px`,
                    height: `${ props.fullScreen ? "100%" : "300" }`
                }}
            >
              <CardActionArea>
                <div style={{ textAlign: `center` }}>
                  <ListingImage listing={listing} mediaHt={props.mediaHt || props.fullScreen ? "50%" : "200"}/>
                </div>
              </CardActionArea>
              <CardContent>
                  <Grid container justify="space-between">
                      <Grid item xs={10}>
                          <Typography>
                              {listing.name || listing.companyName}
                          </Typography>
                      </Grid>
                      { (auth.userAuthData && (auth.userAuthData.email === process.env.NEXT_PUBLIC_ADMIN) ) ? (
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
                  <Grid container>
                      <Grid item>
                          <Typography gutterBottom variant="body2">
                              { listing.businessType || listing.categories.replace('/', ' >> ') }
                          </Typography>
                          <Typography variant="body2">
                              <a href={`tel: ${listing.contactNumber}`}>
                                <Phone style={{verticalAlign: `middle`}}/> { listing.contactNumber }
                              </a>
                          </Typography>
                      </Grid>
                      <Grid item>
                          {auth.userAuthData && (
                              <>
                                  <EditListing listing={listing}/>
                                  <DeleteForever color="disabled" onClick={deleteListing} style={{ color: `orange` }}/>
                              </>
                          )}
                      </Grid>
                      <Grid container spacing={2}>
                        {listing.attributes && Object.keys(listing.attributes).map(key => (
                        <Grid item key={key} xs={6}>
                        <TextField
                          fullWidth
                          label={key}
                          readOnly
                          style={{color: `${auth.themeColor}`}}
                          value={listing.attributes[key]}
                        />
                      </Grid>
                  ))}
                  </Grid>

                  </Grid>
              </CardContent>
              { props.fullScreen && (
              <CardActions>
              <Container maxWidth="xs">
              { Object.keys(listing).map(key => {
                <Typography key={key}>
                  {key} : {listing[key]}
                </Typography>
              })}
              <Typography gutterBottom>
                {listing.companyName || listing.name}
              </Typography>
              <Typography gutterBottom>
                { listing.categories.replace('/', ' >> ') || listing.businessType }
              </Typography>
              <Typography gutterBottom>
                {listing.description && listing.description}
              </Typography>
              {listing.address && (
                <Typography gutterBottom>
                  Address: <br/>
                  {listing.address}
                </Typography>
              )}
              <br/>
                  <Grid container spacing={2}>
                  {listing.attributes && Object.keys(listing.attributes).map(key => (
                      <Grid item key={key} xs={6}>
                        <TextField
                          fullWidth
                          inputProps={{
                            style: { color: `${auth.themeColor}` },
                          }}
                          InputLabelProps={{
                            className: classes.label
                          }}
                          label={key}
                          readOnly
                          value={listing.attributes[key]}
                        />
                      </Grid>
                  ))}
                  </Grid>
              </Container>
              </CardActions>
              )}
            </Card>
          </Grid>
      )}
      </>
    )
}

export default EachListing;
