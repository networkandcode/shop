import Status from '../components/Status';
import { useAuth } from '../hooks/useAuth'
import { db } from '../utils/firebase';

import {
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Container,
    Dialog,
    Grid,
    Typography
} from '@material-ui/core';
import { Close, DeleteForever, KeyboardArrowUp } from '@material-ui/icons'

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const EachCategory = (props) => {
    const auth = useAuth();
    const [ category, setCategory ] = useState(props.category);
    const [ noOfItems, setNoOfItems ] = useState(0);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({
        message: '',
        error: ''
    });

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
        <>{category && category.imgURL &&
            <Grid item key={category.id} xs={6} sm={3}>
                <Card
                    style={{
                        border: `0.1px solid ${ process.env.NEXT_PUBLIC_THEME_COLOR_SEC }`,
                        borderRadius: `5px`,
                        boxShadow: `0.5px 0.5px`,
                        height: `300px`
                    }}
                >
                    <CardActionArea>
                        <div style={{ textAlign: `center` }}>
                          <Link href={`/c?c=${category.name}`}>
                              <a>
                                  <CardMedia
                                      alt={category.name}
                                      component="img"
                                      height="200"
                                      image={category.imgURL || "https://source.unsplash.com/weekly?water"}
                                      title={category.name}
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
                        <CardActions>
                            <Status loading={loading} status={status}/>
                        </CardActions>
                    </CardActionArea>
                </Card>
            </Grid>
        }</>
    )
}

const Categories = ({categories}) => {
    return (
          <div>
              <Typography gutterBottom style={{color: `${process.env.NEXT_PUBLIC_THEME_COLOR}` }} variant="h6">
                  Categories<small>({categories.length})</small>
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
