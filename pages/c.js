import Categories from '../components/Categories';
import Items from '../components/Items';
import { useAuth } from '../hooks/useAuth';
import {
    Typography,
} from '@material-ui/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Category = () => {
  const router = useRouter();
  const auth = useAuth();
  const [ items, setItems ] = useState([]);
  const [ refresh, setRefresh ] = useState(false);
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
      const c = router.query.c;
      setCategory(c);

      if(c){
        var i = [];
        auth.items.map(item => {
            if (item.category === c) {
                i.push(item);
            }
        })
        setItems([...i]);
        var temp = [];
        for(var i=0; i<auth.categories.length; i++){
            const name = auth.categories[i].name;
            if(name.startsWith(c + '/')){
                temp.push(auth.categories[i]);
            }
        }
        setCategories([...temp]);
      }
  }, [auth, router]);
  return (
    <div style={{ padding: `20px` }}>
        <Typography gutterBottom style={{color: `#042F59`}} variant="h5">
            <Link href="/"><a> Home </a></Link>
            { category && category.split('/').map((i, idx) => (
                <Link key={`/c?c=${i}`} href={`/c?c=${category.split('/').slice(0,idx+1).join('/')}`}>
                    <a> >> {i}</a>
                </Link>
            ))}
        </Typography>
        {categories.length > 0 && (
            <div style={{marginBottom: `20px`}}>
                <Categories categories={categories}/>
            </div>
        )}
        <Items items={items}/>
    </div>
  );
};

export default Category;
