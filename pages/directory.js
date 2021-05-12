
import db from '../utils/db';
import {
  Grid, 
  Card,
  CardActionArea, 
  CardActions, 
  Dialog,
  DialogContent,
  DialogContentText,
  Divider,
  TextField,
  Typography, 
  useMediaQuery,
  CardContent, 
  CardMedia  
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import {
  Add, 
  Call,
  Check,
  Clear,
  Close,
  Edit,
  Email,
  KeyboardArrowUp,
  WhatsApp,
  Facebook,
  Instagram,
  YouTube,
  Twitter,
  LinkedIn,
  Public
} from '@material-ui/icons';
import { Rating } from '@material-ui/lab';
import style from '../styles/Home.module.css';
import Link from 'next/link';
import { useRequireAuth } from '../hooks/useRequireAuth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Status from '../components/Status';

const ViewRatings = (props) => {    
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { numOfReviews, reviews, user } = props;
  const [open, setOpen] = useState(false);
  const openDialog = () => {
    setOpen(true);
  }
  const closeDialog = () => {
    setOpen(false);
  }
  var reviewsAsArray = [];
  Object.keys(reviews).map(key => {
    const comment = reviews[key]['comment']
    const rating = reviews[key]['rating']      
    reviewsAsArray.push(<p><Rating readOnly value={rating}/><br/>{comment}<Divider/></p>)
  })
  useEffect(()=>{
  },[reviews]);
  return(
    <>
    {
      reviews &&       
      <>
      <small><button onClick={openDialog}>({numOfReviews})</button></small>
      <Dialog scroll="body" open={open} onClose={closeDialog} fullScreen={fullScreen}>
        <DialogContent>
          <DialogContentText>
            View all reviews for {user.companyName} 
            <Close onClick={() => closeDialog()} size="small" />
            {reviewsAsArray}
          </DialogContentText>
        </DialogContent>
      </Dialog>
      </>
    }   
    </>
  )
}

const GiveRating = (props) => {
  const { auth, open, reviews, user } = props;
  const [review, setReview] = useState({
    comment: reviews[auth.userAuthData.uid] ? reviews[auth.userAuthData.uid]['comment'] : '',
    rating: reviews[auth.userAuthData.uid] ? parseInt(reviews[auth.userAuthData.uid]['rating']) : 0
  });
  const onChange = (e) => {
    const {name, value} = e.target;      
    setReview({...review, [name]: value});        
  }
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  useEffect(()=>{
    setReview({
      ...review,
      comment: reviews[auth.userAuthData.uid] ? reviews[auth.userAuthData.uid]['comment'] : '',
      rating: reviews[auth.userAuthData.uid] ? parseInt(reviews[auth.userAuthData.uid]['rating']) : 0
    });    
  },[auth]);  
  return(
    <>
      {
        review['comment']
          ? <Edit onClick={() => props.openDialog()} size="small"/>
          : <Add onClick={() => props.openDialog()} size="small"/>
      }            
      <Dialog scroll="body" open={open} onClose={() => props.closeDialog(review)} fullScreen={fullScreen}>
        <DialogContent>
          <DialogContentText>
            Give your review and rating to {user.company}
            <Close onClick={() => props.closeDialog(review)} size="small" />
          </DialogContentText>
          <TextField autoFocus fullWidth name="comment" value={review.comment} onChange={onChange}/>    
          <Rating  name="rating" value={review.rating} onChange={onChange} size="small"/>
        </DialogContent>         
      </Dialog>
    </>
  )
}

const Listing = (props) => {  
  var colors = ["hotpink", "indigo", "grey", "inherit"];
  const auth = useRequireAuth();
  const [user, setUser] = useState(props.user);
  const [loading, setLoading] = useState(false);  
  const [status, setStatus] = useState({    
    message: '',
    error: ''
  });
  const [open, setOpen] = useState(false);
  const [avgRating, setAvgRating] = useState(0);
  const [numOfReviews, setNumOfReviews] = useState(0);
  const [reviews, setReviews] = useState(user['reviews'] || {});
  const approveListing = user => {   
    setLoading(true);
    setUser({...user, approved: true});    
  }
  const disapproveListing = user => {
    setLoading(true);       
    setUser({...user, approved: false});
  }
  const updateUserDoc = async() => {
    console.log(user);
    await axios.post(`/api/users`, user);
    setLoading(false);
  }
  useEffect(()=>{
    setReviews({...reviews, ...user['reviews']});    
  },[]);
  const openDialog = () => {
    setOpen(true);
  }
  const closeDialog = (review) => {
    setOpen(false);
    setReviews({...reviews, [auth.userAuthData.uid]: review});    
  }
  useEffect(() => {    
    var sum = 0;
    var n = 0;
    for(const [key, value] of Object.entries({...reviews})){                
      sum = sum + parseInt(value['rating']);
      n = n + 1;
    }        
    setAvgRating(sum/n);
    setNumOfReviews(n);
    setUser({...user, reviews});    
  },[reviews]);
  useEffect(() => {
    updateUserDoc();
  }, [user]);
  return(
    <Grid style={{ backgroundColor: `${colors[Math.floor(Math.random() * colors.length)]}` }} item xs={12} sm={4}>
      <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={user.companyName}
          height="150"
          image={user.businessCategories 
            ? 'https://source.unsplash.com/featured/?' + user.businessCategories[Math.floor(Math.random() * user.businessCategories.length)]
            : 'https://source.unsplash.com/featured/?' + user.businessCategory
          }
          title={user.companyName}
        />
      </CardActionArea>
      <CardContent>
        <Typography variant="h6" component="h3">
          <Link href={`/directory/${user.companyName}`}>
            <a>{user.displayName } | {user.companyName} </a>             
          </Link>                          
          <Rating value={avgRating} readOnly size="small"/>
          <ViewRatings numOfReviews={numOfReviews} reviews={reviews} user={user}/>
          {auth.userAuthData && auth.userAuthData.emailVerified && auth.userAuthData.uid !== user.id && 
            <GiveRating auth={auth} open={open} openDialog={openDialog} closeDialog={closeDialog} reviews={reviews} user={user}/>            
          }
        </Typography>
        { user.establishedYear && (
          <Typography gutterBottom variant="overline" color="textSecondary" component="small">
            since {user.establishedYear.split('-')[0]}                                
          </Typography>
        )}                   
        <Typography variant="body2" color="textSecondary" component="p" gutterBottom> 
          { user.businessCategories && user.businessCategories.map(i => (
            <>
              {i} | {' '}
            </>
          ))}
          {user.businessType}
        </Typography>
        <Typography component="h6" gutterBottom> 
          { user.companyDescription }
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p"> 
          {user.address} {user.pinCode} <br/>
          {user.poName} | {user.district} | {user.state} | {user.country}
        </Typography>
      </CardContent>
      <CardActions>
        <Grid container>
          <Grid item xs={9}>
            <a href={`tel:${user.phoneNumber}`}> <Call color="primary"/> </a>
            <a href={`tel:${user.altPhNo}`}> <Call/> </a>
            <a href={`https://api.whatsapp.com/send?phone=${user.whatsapp}`}> <WhatsApp/> </a>
            <a href={`https://facebook.com/${user.facebook}`}> <Facebook/> </a>                
            <a href={`https://www.instagram.com/${user.instagram}`}> <Instagram/> </a>
            <a href={`https://www.youtube.com/channel/${user.youtube}`}> <YouTube/> </a>
            <a href={`https://twitter.com/${user.twitter}`}> <Twitter/> </a>
            <a href={`https://linkedin.com/${user.linkedin}`}> <LinkedIn/> </a>
            <a href={user.website}> <Public/> </a>
            <a href={`mailto:${user.email}`}><Email/></a>   
            { auth.userAuthData 
                ?
                  ['shakir@techie.com', 'admin@example.com', 'fajurnisha86@gmail.com'].includes(auth.userAuthData.email)
                    ?
                      user.approved 
                        ? 
                          <Clear onClick={() => disapproveListing(user)}/> 
                        : 
                          <Check onClick={() => approveListing(user)}/> 
                    :
                      <></>
                : 
                  <></>
            }                       
          </Grid>
          <Grid item xs={3} style={{textAlign: `right`}}>
            <a href="#"> <KeyboardArrowUp/> </a>
          </Grid>
        </Grid>                  
            <Status loading={loading} status={status}/>
      </CardActions>
    </Card>                  
    </Grid>    
  )
}

const Directory = (props) => {
  const { usersData } = props; 
  const router = useRouter();
  const auth = useRequireAuth();
  return (
    <>    
      <Grid container spacing={2} style={{paddingRight: `10px`, paddingLeft: `10px`, backgroundColor: `#FFFFFF`}}>
      {usersData.map((user, idx) => (  
        <>
        {user.emailVerified && 
          (user.approved || (auth.userAuthData && ['shakir@techie.com', 'admin@example.com', 'fajurnisha86@gmail.com'].includes(auth.userAuthData.email))) &&  
          <Listing key={idx} user={user}/>
        }
        </>
      ))}
      </Grid>
    </>
  );
};

export const getStaticProps = async () => {
  const users = await db.collection('users').orderBy('displayName').get();
  var usersData = users.docs.map(user => ({
    id: user.id,
    ...user.data()
  }));  
  return {
    props: { usersData },
    revalidate: 10
  }
}

export default Directory;