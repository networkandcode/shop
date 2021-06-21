import Categories from '../components/Categories';
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
        <div style={{ padding: `20px` }}>
            {categories.length > 0 && (
                <div style={{marginBottom: `20px`}}>
                    <Categories categories={categories}/>
                </div>
            )}
        </div>
    )
}

export default Home
