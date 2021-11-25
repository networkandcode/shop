import EditListing from './EditListing';
import ListingGallery from './ListingGallery';
import ListingImage from './ListingImage';
import ListingSocial from './ListingSocial';
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
import {
  Add,
  Clear,
  Check,
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

const EachListing = (props) => {
    const state = useAuth();
    const classes = state.useStyles();

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
                  state.deleteListing(listing.id);
                  setListing({});
              } else{
                  setStatus({ ...status, ['error']: result.data.error });
              }
            });
    };

    const approveListing = async(bool) => {
      const record = {...listing, verifiedByAdmin: bool };
      await axios.post("/api/db", { operation: 'update', record, table: 'listings' })
       .then(res => {
         if(res.data.error){
           setStatus({ ...status, ['error']: res.data.error });
         } else{
           setStatus({ ...status, ['message']: res.data.message });
           state.updateListing(record);
           setListing({ ...record });
         }
       });
    };

    const handleFavorite = e => {
        e.preventDefault();
        setFav(!fav);
        state.updateFavs(listing.id, !fav);
    };

    useEffect(() => {
        if(listing){
            const { id } = listing;
            if(state.favs && state.favs.includes(id)){
                if(!fav) setFav(true);
            } else {
                if(fav) setFav(false);
            }
        }
    },[]);

    return(
      <>
        {listing && (listing.verifiedByAdmin || (state.userAuthData && (state.userAuthData.email === process.env.NEXT_PUBLIC_ADMIN) )) &&(
          <Grid item key={listing.id} xs={props.xsSize} sm={props.smSize}>
            <Card
                className={classes.card}
                style={{
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

                            {listing.name || listing.companyName} {'   '}
                            { listing.logo && (
                              <img
                                alt={listing.companyName || listing.name}
                                height={35}
                                src={listing.logo}
                                title={listing.companyName || listing.name}
                              />
                            )}

                            <br/>

                            <Typography gutterBottom variant="body2">
                              <a href={`tel: ${listing.contactNumber}`}>
                                <Phone style={{verticalAlign: `middle`}}/> { listing.contactNumber }
                              </a>
                            </Typography>

                      </Grid>

                      { (state.userAuthData && (state.userAuthData.email === process.env.NEXT_PUBLIC_ADMIN) ) ? (
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
                              { listing.businessType || listing.categories.replace('/', ' > ') }
                          </Typography>
                      </Grid>
                      <Grid item>
                          { state.userAuthData && (state.userAuthData.email === process.env.NEXT_PUBLIC_ADMIN) && (
                              <>
                                { (listing.verifiedByAdmin === true || listing.addedBy ===  process.env.NEXT_PUBLIC_ADMIN)
                                  ? <Clear onClick={() => approveListing(false)} />
                                  : <Check onClick={() => approveListing(true)} />
                                }
                                  <EditListing listing={listing}/>
                                  <DeleteForever color="disabled" onClick={deleteListing} style={{ color: `orange` }}/>
                              </>
                          )}
                      </Grid>
                  </Grid>

              </CardContent>
              { props.fullScreen && (
              <CardContent>
                <Grid container>
                  <Grid item xs={12} sm={6}>
              { Object.keys(listing).map(key => {
                <Typography key={key}>
                  {key} : {listing[key]}
                </Typography>
              })}
              <Typography gutterBottom>
                {listing.companyName || listing.name}
              </Typography>

              <Typography gutterBottom>
                { listing.categories.replace('/', ' > ') || listing.businessType }
              </Typography>

              {listing.description && (
                <Typography gutterBottom>
                  {listing.description}
                </Typography>
              )}

              { listing.productsOffered && (
                <Typography gutterBottom>
                  Products offered: { listing.productsOffered }
                </Typography>
              )}

              {listing.address && (
                <Typography gutterBottom>
                  Address: <br/>
                  {listing.address} {' '}
                  {listing.pinCode && listing.pinCode}
                </Typography>
              )}

              <br/>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ListingSocial listing={listing}/>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <ListingGallery listing={listing}/>
                </Grid>
              </Grid>
              </CardContent>
              )}
            </Card>
          </Grid>
      )}
      </>
    )
}

export default EachListing;
