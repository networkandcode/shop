import { useAuth } from '../hooks/useAuth'
import { Card, CardActionArea, CardContent, CardMedia, Container, Dialog, Grid, Typography } from '@material-ui/core'
import { Close, DeleteForever, KeyboardArrowUp } from '@material-ui/icons'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const EachCategory = (props) => {
    const auth = useAuth();
    const [ category, setCategory ] = useState(props.category);
    const [ noOfItems, setNoOfItems ] = useState(0);
    const deleteCategory = async(id) => {
        await auth.deleteCategory(id)
        setCategory({})
    };
    const [ openDialog, setOpenDialog ] = useState(false)
    const closeDialog = () => {
        setOpenDialog(false);
    };

    useEffect(() => {
        var temp = 0;
        auth.items.forEach( i => {
            if (i.category.startsWith(category.name)){
                temp = temp + 1;
            }
        });
        setNoOfItems(temp)
    },[auth]);

    return (
        <>
        {category && category.imgURL && (noOfItems > 0) &&
        <Grid item key={category.id} style={{backgroundColor: `white`}}  xs={6} sm={3}>
        <Card style={{ border: `0.1px solid dimgray`, borderRadius: `5px`, boxShadow: `2px 2px`, height: `250px` }}>
              <CardActionArea>
                  <div style={{ textAlign: `center` }}>
                    <Link href={`/c?c=${category.name}`}>
                        <a>
                            <img
                                alt={category.name}
                                style={{ maxHeight: `150px`}}
                                src={category.imgURL || "https://source.unsplash.com/weekly?water"}
                            />
                        </a>
                    </Link>
                  </div>
                  <CardContent>
                      <Grid container>
                          <Grid item sm={8} xs={12}>
                              <Link href={`/c?c=${category.name}`}>
                                  <a>
                                      <Typography gutterBottom variant="body1" component="p">
                                          {category.name}({noOfItems})
                                      </Typography>
                                  </a>
                              </Link>
                          </Grid>
                          <Grid item style={{ textAlign: `right` }} sm={4} xs={12}>
                              {auth.userAuthData && (<DeleteForever color="disabled" onClick={() => deleteCategory(category.id)}/>)}
                              <a href="#"> <KeyboardArrowUp color="disabled"/> </a>
                          </Grid>
                      </Grid>
                  </CardContent>
              </CardActionArea>
        </Card>
        </Grid>
        }
        </>
    )
}

const Categories = () => {
    const auth = useAuth();
    const router = useRouter();
    const [ categories, setCategories ] = useState([]);
    useEffect(() => {
        const {sub} = router.query;
        var temp = [];
        auth.categories.forEach(i => {
            if(!i.name.includes('/')){
                temp.push(i);
            }
        });
        setCategories(temp);
    },[auth, router])
    return (
        <Grid container spacing={2} style={{padding: `10px`}}>
            {categories.map((category, idx) => (
                <EachCategory category={category} key={idx}/>
            ))}
        </Grid>
    )
}

export default Categories
