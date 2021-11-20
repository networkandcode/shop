import ListingForm from '../components/ListingForm';
import { useAuth } from '../hooks/useAuth';
import router from 'next/router';
import { useEffect, useState } from 'react';

const Profile = () => {
  const state = useAuth();
  const [ listing, setListing ] = useState({addedByAdmin: false, email: state.userAuthData.email});
  const [ isNewListing, setIsNewListing ] = useState(true);

  useEffect(() => {
    state.listings.forEach( l => {
      if (l.email === state.userAuthData.email && l.addedByAdmin !== true){
        setListing({...listing, ...l});
        setIsNewListing(false);
      }
    })
  },[state]);

  if(state.userAuthData && (state.userAuthData.email !== process.env.NEXT_PUBLIC_ADMIN)){
    return <ListingForm isNewListing={isNewListing} listing={listing}/>;
  }
  return <div style={{ padding: `100px`, textAlign: `center` }}>Page doesn't exist</div>;
}

export default Profile;