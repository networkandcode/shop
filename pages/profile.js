import ListingForm from '../components/ListingForm';
import { useAuth } from '../hooks/useAuth';
import router from 'next/router';
import { useEffect, useState } from 'react';

const Profile = () => {
  const state = useAuth();
  const [ listing, setListing ] = useState({addedByAdmin: false, email: state.userAuthData.email});

  useEffect(() => {
    state.listings.forEach( l => {
      if (l.email === state.userAuthData.email && l.addedByAdmin !== true){
        setListing({...listing, ...l});
      }
    })
  },[state]);

  if(state.userAuthData && (state.userAuthData.email !== process.env.NEXT_PUBLIC_ADMIN)){
    return <ListingForm isNewListing={false} listing={listing}/>;
  }
  return <div style={{ padding: `100px`, textAlign: `center` }}>Page doesn't exist</div>;
}

export default Profile;
