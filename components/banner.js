import {
    Grid,
    Typography,
} from '@material-ui/core';



const banner = () => {

  return (
    <>
        <Grid container spacing={2} style={{marginBottom: `10px`, paddingTop: `10px`, backgroundColor: `seashell`}}>
            <Grid item xs={12} sm={12}>
                <Typography style={{color: `#042F59`}} variant="h3" component="h1"> Marebox </Typography>
                <Typography style={{color: `#042F59`}} component="p" variant="subtitle1"> Connect with the right Product/Service Experts </Typography>
                <Typography style={{color: `#042F59`}} component="p" paragraph variant="subtitle2"> Find B2B {'&'} B2C businesses contact addresses, phone numbers,
user ratings and reviews </Typography>
            </Grid>   
            </Grid>         
       
    </>    
)};

export default banner;