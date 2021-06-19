import { useAuth } from '../hooks/useAuth'
import { db } from '../utils/firebase';
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
        await axios.post("/api/db", { operation: 'delete', record: category, table: 'categories' })
            .then(result => {
              if(result.data.error){
                    setStatus({ ...status, ['error']: result.data.error });
                } else{
                    setStatus({ ...status, ['message']: result.data.message });
                    auth.deleteCategory(id);
                    setCategory({});
                }
            });
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
        {category && category.imgURL &&
        <Grid item key={category.id} style={{backgroundColor: `${process.env.NEXT_PUBLIC_THEME_COLOR_SEC}`}}  xs={6} sm={3}>
        <Card style={{ border: `0.1px solid ${ process.env.NEXT_PUBLIC_THEME_COLOR }`, borderRadius: `5px`, boxShadow: `2px 2px`, height: `230px` }}>
              <CardActionArea>
                  <div style={{ textAlign: `center` }}>
                    <Link href={`/c?c=${category.name}`}>
                        <a>
                            <img
                                component="img"
                                alt={category.name}
                                style={{ maxHeight: `150px` }}
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
                          <Grid item sm={4} style={{ textAlign: `right` }} xs={12}>
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

const Categories = ({categories}) => {
    return (
          <div>
              <Typography gutterBottom style={{color: `${process.env.NEXT_PUBLIC_THEME_COLOR}` }} variant="h6">
                  Sub categories<small>({categories.length})</small>
              </Typography>
              <Grid container spacing={2}>
                  {categories.map((category, idx) => (
                      <EachCategory category={category} key={idx}/>
                  ))}
              </Grid>
          </div>
    )
}

export default Categories
