import { useAuth } from '../hooks/useAuth'
import { db } from '../utils/firebase';
import { Card, CardActionArea, CardContent, CardMedia, Container, Dialog, Grid, Typography } from '@material-ui/core'
import { Close, DeleteForever, KeyboardArrowUp } from '@material-ui/icons'
import Link from 'next/link'
import { useEffect, useState } from 'react'

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
                                      <Typography gutterBottom style={{color:`#042F59`}} variant="body1" component="p">
                                          {category.name}
                                      </Typography>
                                  </a>
                              </Link>
                          </Grid>
                          <Grid item>
                              {auth.userAuthData && (<DeleteForever onClick={() => deleteCategory(category.id)}/>)}
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
    const auth = useAuth()
    const [ categories, setCategories ] = useState([])
    useEffect(() => { 
        setCategories(auth.categories)
    },[auth])
    return (
        <Container mt={0}>
            <Grid container spacing={2}>
                {categories.map((category, idx) => (
                    <EachCategory category={category} key={idx}/>
                ))}
            </Grid>
        </Container>
    )
}

export default Categories
