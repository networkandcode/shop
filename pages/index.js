import Banner from '../components/Banner';
import Categories from '../components/Categories';
import DirCategories from '../components/DirCategories';
import { useAuth } from '../hooks/useAuth'
import { Card, CardActionArea, CardContent, CardMedia, Container, Grid, Typography } from '@material-ui/core'
import { Close, DeleteForever, KeyboardArrowUp } from '@material-ui/icons'
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Home = () => {

    const auth = useAuth();
    const router = useRouter();
    const [ categories, setCategories ] = useState([]);

    useEffect(() => {
        const {sub} = router.query;
        var temp = [];
        auth.categories.length > 0 && auth.categories.forEach(i => {
            if(!i.name.includes('/')){
                temp.push(i);
            }
        });
        setCategories(temp);
    },[auth, router])

    return (
        <>
            <Banner/>
            <div
              style={{
                backgroundColor: `${auth.themeBgColor}`,
                padding: `20px`
              }}
            >
              <Grid container
                spacing={2}
                style={{paddingRight: `10px`, paddingLeft: `10px`, backgroundColor: `${auth.themeBgColor}`}}
              >
                <Grid item xs={12} sm={4}>
                  <Link href="/shop"><Card style={{
                    backgroundColor: `${auth.themeBgColor}`,
                    color: `${auth.themeColor}`,
                    border: `0.1px solid ${ process.env.NEXT_PUBLIC_THEME_COLOR_SEC }`,
                    borderRadius: `5px`,
                    boxShadow: `0.5px 0.5px`
                  }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        alt="shop"
                        height="150"
                        image={`https://source.unsplash.com/featured/?shop ${process.env.NEXT_PUBLIC_UNSPLASH_BANNER_TAG}`}
                        title="shop"
                      />
                    </CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="h3">
                      <a>Shop</a>
                      </Typography>
                      <Typography variant="body2" component="p"> 
                        Checkout items for sale...
                      </Typography>
                    </CardContent>
                  </Card></Link>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Link href="/directory"><Card  style={{
                    backgroundColor: `${auth.themeBgColor}`,
                    color: `${auth.themeColor}`,
                    border: `0.1px solid ${ process.env.NEXT_PUBLIC_THEME_COLOR_SEC }`,
                    borderRadius: `5px`,
                    boxShadow: `0.5px 0.5px`
                  }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        alt="directory"
                        height="150"
                        image={`https://source.unsplash.com/featured/?directory ${process.env.NEXT_PUBLIC_UNSPLASH_BANNER_TAG}`}
                        title="directory"
                      />
                    </CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="h3">
                      <a>Directory</a>
                      </Typography>
                      <Typography variant="body2" component="p">
                        Checkout business listings...
                      </Typography>
                    </CardContent>
                  </Card></Link>
                </Grid>
              </Grid>
            </div>
        </>
    )
}

export default Home
