import EachListing from '../../components/EachListing';
import { useAuth } from '../../hooks/useAuth';
import { Box, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Listing = () => {
  const router = useRouter();
  const { id } = router.query;
  const state = useAuth();

  const [ listing, setListing ] = useState({});
  const [ categories, setCategories ] = useState([]);

  useEffect(() => {
    state.listings.forEach(l => {
      if(l.id === id){
        setListing({...l});
        var temp = [];
        l.categories.split(',').forEach(c => {
          if(c.trim()){
            temp.push(c);
          }
        });
        setCategories([...temp]);
      }
    });
  },[ router, state ])

  return (
    <Box
      container
      justify="center"
      style={{
        backgroundColor: `${state.themeBgColor}`,
        padding: `20px`
      }}
    >
      <Typography gutterBottom style={{color: `${process.env.NEXT_PUBLIC_THEME_COLOR}` }} variant="h5">
        <Link href="/">
          <a>
            {process.env.NEXT_PUBLIC_COMPANY_NAME || 'Home'}
          </a>
        </Link>
        {' > '}
        <Link href="/directory">
          <a>
            Directory
          </a >
        </Link>
        <br/>
      </Typography>
      <Typography gutterBottom style={{color: `${process.env.NEXT_PUBLIC_THEME_COLOR}` }} variant="h5">
        { categories && categories.map(c => (
          <>
            { c.trim() && c.trim().split('/').map((i, idx) => (
              <Link key={`/dc?c=${i}`} href={`/dc?c=${c.trim().split('/').slice(0,idx+1).join('/')}`}>
                <a> / {i}</a>
              </Link>
            ))}
          </>
        ))}
      </Typography>

      <Typography gutterBottom style={{color: `${process.env.NEXT_PUBLIC_THEME_COLOR}` }} variant="h5">
        { listing.name || listing.companyName }
      </Typography>

      { listing.categories && <EachListing fullScreen={true} listing={listing} smSize={6} xsSize={12}/> }

    </Box>
  )
}

export default Listing;
