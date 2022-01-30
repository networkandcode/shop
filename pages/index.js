import NewBanner from '../components/NewBanner';
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
            <NewBanner/>
        </>
    )
}

export default Home
