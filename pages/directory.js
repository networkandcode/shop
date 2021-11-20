import Categories from '../components/Categories';
import Listings from '../components/Listings';
import DirCategories from '../components/DirCategories';
import { useAuth } from '../hooks/useAuth'
import { Card, CardActionArea, CardContent, CardMedia, Container, Dialog, Grid, Typography } from '@material-ui/core'
import { Close, DeleteForever, KeyboardArrowUp } from '@material-ui/icons'
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Home = () => {

    const auth = useAuth();
    const router = useRouter();
    const [ categories, setCategories ] = useState([]);
    const [ listings, setListings ] = useState([]);

    useEffect(() => {
        const {sub} = router.query;
        var temp = [];

        var i = [];
        auth.listings.map(listing => {
            if (listing.categories) {
                i.push(listing);
            }
        })
        setListings([...i]);

        auth.categories.length > 0 && auth.categories.forEach(i => {
            if(!i.name.includes('/')){
                temp.push(i);
            }
        });
        setCategories(temp);
    },[auth, router])

    return (
        <>
            <div
              style={{
                backgroundColor: `${auth.themeBgColor}`,
                padding: `20px`
              }}
            >

              <Typography gutterBottom style={{color: `${process.env.NEXT_PUBLIC_THEME_COLOR}` }} variant="h5">
                <Link href="/"><a> {process.env.NEXT_PUBLIC_COMPANY_NAME || 'Home'} </a></Link> > <Link href="/directory"><a> Directory </a></Link>
              </Typography>

                {process.env.NEXT_PUBLIC_NEED_DIR && (categories.length > 0) && (
                  <>
                      <div style={{marginBottom: `20px`}}>
                        <DirCategories categories={categories}/>
                      </div>
                  </>
                )}

              <Listings listings={listings}/>
            </div>
        </>
    )
}

export default Home
