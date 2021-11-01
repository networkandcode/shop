import EachListing from '../components/EachListing';
import { useAuth } from '../hooks/useAuth';
import { Grid } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useRouter } from 'router';

const Listing = (props) => {
  const router = useRouter();
  const id = { router.query }
  const state = useAuth();

  const [ listing, setListing ] = useState();

  useEffect(() => {
    console.log(router);
    state.listings.forEach(l => {
      if(l.id === id){
        setListing({...l});
      }
    });
  },[state])

  return (
    <>
      <Grid container justify="center">
        <EachListing fullScreen={true} listing={listing} smSize={6} xsSize={12}/>
      </Grid>
    </>
  )
}

/*export async function getServerSideProps(context) {
  const { i } = context.query;
  console.log(i);

  return {
    props: { i }, // will be passed to the page component as props
  }
}*/

export default Listing;
