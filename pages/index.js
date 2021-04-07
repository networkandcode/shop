
import db from '../utils/db';
import { 
  Container,
  Grid, 
  Card, 
  
  CardActionArea, 
  CardActions, 
  Typography, 
  CardContent, 
  CardMedia 
} from '@material-ui/core';
import style from '../styles/Home.module.css';
import Link from 'next/link'


  

const Categories = (props) => {
  const { categoriesData } = props;
  

  return (
    <>
    
      <Grid container spacing={2} style={{paddingRight: `10px`, paddingLeft: `10px`, backgroundColor: `#FFFFFF`}}>
      {categoriesData.map(category => (
        <Grid item key={category.id} xs={12} sm={4}>
          <Card >
            <CardActionArea>
              <CardMedia
                component="img"
                alt={category.slug}
                height="150"
                image={`https://source.unsplash.com/featured/?${category.slug}`}
                title={category.name}
              />
            </CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h6" component="h3">
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
      
    </>
  );
};

export const getStaticProps = async () => {
  const categories = await db.collection('categories').orderBy('name').get();
  var categoriesData = categories.docs.map(category => ({
    id: category.id,
    ...category.data()
  }));
  return {
    props: { categoriesData },
    revalidate: 10
  }
}

export default Categories;