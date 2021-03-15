import Link from 'next/link'
import db from '../../utils/db';
import { Container, Grid, Card, makeStyles, CardActionArea, CardActions, Typography, CardContent, CardMedia } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

const Categories = (props) => {
  const { categoriesData } = props;
  const classes = useStyles();

  return (
    <Container>
      <h1>Categories</h1>
      <Grid container spacing={1}>
      {categoriesData.map(category => (
        <Grid item key={category.id} xs={12} sm={4}>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt={category.slug}
                height="200"
                image={`https://source.unsplash.com/featured/?${category.slug}`}
                title={category.name}
              />
            </CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
              <Link href={`/categories/${category.slug}`}>
                <a>{category.name}</a>            
              </Link>                        
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Checkout listings for {category.name}
              </Typography>
            </CardContent>
            <CardActions>
            </CardActions>
          </Card>         
        </Grid>      
      ))}
      </Grid>
    </Container>
  );
};

export const getStaticProps = async () => {
  const categories = await db.collection('categories').orderBy('created', 'desc').get();
  const categoriesData = categories.docs.map(category => ({
    id: category.id,
    ...category.data()
  }));
  return {
    props: { categoriesData },
    revalidate: 10
  }
}

export default Categories;