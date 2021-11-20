import Banner from '../components/Banner';
import Categories from '../components/Categories';
import DirCategories from '../components/DirCategories';
import { useAuth } from '../hooks/useAuth'
import homePageSections from '../vars/homePageSections';
import { Card, CardActionArea, CardContent, CardMedia, Container, Grid, Typography } from '@material-ui/core'
import { Close, DeleteForever, KeyboardArrowUp } from '@material-ui/icons'
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Home = () => {

    const state = useAuth();
    const classes = state.useStyles();
    const router = useRouter();
    const [ categories, setCategories ] = useState([]);

    useEffect(() => {
        const {sub} = router.query;
        var temp = [];
        state.categories.length > 0 && state.categories.forEach(i => {
            if(!i.name.includes('/')){
                temp.push(i);
            }
        });
        setCategories(temp);
    },[state, router])

    return (
        <>
            <Banner/>
              <Grid container
                spacing={2}
                style={{ backgroundColor: `${state.themeBgColor}`, padding: `10px` }}
              >

               {Object.values(homePageSections).map( homePageSection => (

                <Grid item xs={12} key={homePageSection.name} sm={3}>
                  <Link href={homePageSection.link}><Card className={classes.card}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        alt={homePageSection.name}
                        height="150"
                        image={`https://source.unsplash.com/featured/?${homePageSection.name} ${process.env.NEXT_PUBLIC_UNSPLASH_BANNER_TAG}`}
                        title={homePageSection.name}
                      />
                    </CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="h3">
                      <a>{homePageSection.name}</a>
                      </Typography>
                      <Typography variant="body2" component="p">
                        {homePageSection.description}
                      </Typography>
                    </CardContent>
                  </Card></Link>
                </Grid>
                ))}
            </Grid>
        </>
    )
}

export default Home
