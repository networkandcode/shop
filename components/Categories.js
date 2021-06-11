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
    const deleteCategory = async(id) => {
        await auth.deleteCategory(id)
        setCategory({})
    };
    const [ openDialog, setOpenDialog ] = useState(false)
    const closeDialog = () => {
        setOpenDialog(false);
    };
    return (
        <>
        {category && category.imgURL &&
        <Grid item key={category.id} style={{backgroundColor: `white`}}  xs={6} sm={4}>
        <Card>
              <CardActionArea>
                  <Link href={`/c?c=${category.name}`}>
                      <a>
                          <CardMedia
                              component="img"
                              alt={category.name}
                              height="150"
                              image={category.imgURL || "https://source.unsplash.com/weekly?water"}
                              title={category.name}
                          />
                      </a>
                  </Link>
                  <CardContent>
                      <Grid container>
                          <Grid item>
                              <Link href={`/c?c=${category.name}`}>
                                  <a>
                                      <Typography gutterBottom variant="body1" component="p">
                                          {category.name}
                                      </Typography>
                                  </a>
                              </Link>
                          </Grid>
                          <Grid item>
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
              <Typography gutterBottom style={{color: `dimgray`}} variant="h6">
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
