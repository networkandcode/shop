import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

export default function Social() {
  
  return (
    <React.Fragment>
      <Container maxWidth="sm">
      <Typography variant="h6">
         Social Links
      </Typography>
      <Grid container spacing={3}>
      <Grid item xs={12} sm={12}>
          <TextField
            
            variant="outlined"
            margin="normal"
            id="whatsapp"
            name="whatsapp"
            label="Whatsapp Number"
            fullWidth
          />
        </Grid>
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
        <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
              </Grid>
              </Container>
    </React.Fragment>
  );
}
