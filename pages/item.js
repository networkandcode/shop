import EachItem from '../components/EachItem';
import { useAuth } from '../hooks/useAuth';
import {
  Grid,
  Typography,
} from '@material-ui/core';
import Link from 'next/link';
import { useClientRouter } from 'use-client-router';
import { useEffect, useState } from 'react';

const Item = () => {
  const router = useClientRouter();
  const auth = useAuth();
  const [ item, setItem ] = useState({});
  const [ category, setCategory ] = useState('');

  useEffect(() => {
      const id = router.query.i;

      auth.items.forEach(i => {
        if(i.id === id){
          setItem(i);
          setCategory(i.category);
        }
      });
  }, [auth, router]);

  return (
    <div
      style={{
        backgroundColor: `${auth.themeBgColor}`,
        padding: `20px`
      }}
    >
        <Typography gutterBottom style={{color: `${process.env.NEXT_PUBLIC_THEME_COLOR}` }} variant="h5">
            <Link href="/"><a> {process.env.NEXT_PUBLIC_COMPANY_NAME || 'Home'} </a></Link> >> <Link href="/shop"><a> Shop </a></Link>
            { category && category.split('/').map((i, idx) => (
                <Link key={`/c?c=${i}`} href={`/c?c=${category.split('/').slice(0,idx+1).join('/')}`}>
                    <a> >> {i}</a>
                </Link>
            ))}
            >> <a href="#"> {item.name} </a>
        </Typography>
        <Grid container justify="center">
            <EachItem fullScreen={true} item={item} key={item.id} smSize={6} xsSize={12}/>
        </Grid>
    </div>
  );
};

export default Item;
