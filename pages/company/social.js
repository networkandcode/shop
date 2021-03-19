import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

export default function Social() {
  
  return (
    <React.Fragment>
      <Typography variant="h6">
         Company Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <TextField
            
            variant="outlined"
            margin="normal"
            id="facebook"
            name="facebook"
            label="Facebook"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            
            variant="outlined"
            margin="normal"
            id="twitter"
            name="twitter"
            label="Twitter"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            
            variant="outlined"
            margin="normal"
            id="youtube"
            name="youtube"
            label="Youtube"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            
            variant="outlined"
            margin="normal"
            id="linkedin"
            name="linkedin"
            label="LinkedIn"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            
            variant="outlined"
            margin="normal"
            id="website"
            name="website"
            label="website"
            fullWidth
          />
        </Grid>
              </Grid>
    </React.Fragment>
  );
}
