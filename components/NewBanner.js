import { useAuth } from '../hooks/useAuth';
import homePageSections from '../vars/homePageSections';
import { Card, CardActionArea, CardContent, CardMedia, Container, Grid, Typography } from '@material-ui/core'
import Link from 'next/link';


const NewBanner = () => {
    const state = useAuth();
    const classes = state.useStyles();
    
    return (
      <div className="container">
        <img src={process.env.NEXT_PUBLIC_COMPANY_BANNER_URL} alt="Notebook" style={{width:`100%`}}/>
        <div className="content">
        
        <Grid container
                spacing={2}
                style={{ padding: `10px` }}
              >

               {Object.values(homePageSections).map( homePageSection => (

                <Grid item xs={12} key={homePageSection.name} sm={3}>
                  <Link href={homePageSection.link}><Card className={classes.card}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        alt={homePageSection.name}
                        height="150"
                        image={`https://source.unsplash.com/featured/?${homePageSection.name} ${process.env.NEXT_PUBLIC_UNSPLASH_BANNER_TAG}`}
                        title={homePageSection.name}
                      />
                    </CardActionArea>
                    <CardContent style={{color: `hotpink`}}>
                      <Typography gutterBottom variant="h6" component="h3">
                      <a>{homePageSection.name}</a>
                      </Typography>
                      <Typography variant="body2" component="p">
                        {homePageSection.description}
                      </Typography>
                    </CardContent>
                  </Card></Link>
                </Grid>
                ))}
            </Grid>
        </div>
      </div>
    );
};

export default NewBanner;