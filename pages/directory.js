
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

const Directory = (props) => {
  const { usersData } = props; 
  return (
    <>
    
      <Grid container spacing={2} style={{paddingRight: `10px`, paddingLeft: `10px`, backgroundColor: `seashell`}}>
      {usersData.map(user => (
        <Grid item key={user.id} xs={12} sm={4}>
          <Card >
            <CardActionArea>
              <CardMedia
                component="img"
                alt={user.companyName}
                height="150"
                image={user.businessCategories 
                  ? 'https://source.unsplash.com/featured/?' + user.businessCategories[Math.floor(Math.random() * user.businessCategories.length)]
                  : 'https://source.unsplash.com/featured/?' + user.district
                }
                title={user.companyName}
              />
            </CardActionArea>
            <CardContent>
              <Typography variant="h6" component="h3">
              <Link href={`/directory/${user.companyName}`}>
                <a>{user.companyName} </a>            
              </Link>                          
              </Typography>  
              { user.establishedYear && (
                <Typography gutterBottom variant="overline" color="textSecondary" component="small">
                  since {user.establishedYear.split('-')[0]}                                
                </Typography>
              )}                   
              <Typography variant="body2" color="textSecondary" component="p" gutterBottom> 
                { user.businessCategories && user.businessCategories.map(i => (
                  <>
                    {i} | {' '}
                  </>
                ))}
                {user.businessType}
              </Typography>
              <Typography component="h6" gutterBottom> 
                { user.companyDescription }
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p"> 
                {user.address} {user.pinCode} <br/>
                {user.poName} | {user.district} | {user.state} | {user.country}
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
  const users = await db.collection('users').orderBy('displayName').get();
  var usersData = users.docs.map(user => ({
    id: user.id,
    ...user.data()
  }));  
  return {
    props: { usersData },
    revalidate: 10
  }
}

export default Directory;