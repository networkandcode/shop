import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

export default function Contact() {
  return (
    <React.Fragment>
      <Container maxWidth="sm">
      <Typography variant="h6" gutterBottom>
        Contact Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
        <TextField
            required
            variant="outlined"
            margin="normal"
            id="contactperson"
            name="contactperson"
            label="Contact Person"
            fullWidth
            autoComplete="given-name"
            autoFocus
          />        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            variant="outlined"
            margin="normal"
            id="mobileNumber"
            label="Mobile Number"
            helperText="Ex:+91-9999999999"
            fullWidth
            autoComplete="Mobile-number"
          />
        </Grid>
        <Grid item xs={12} md={6}>
        <TextField
            variant="outlined"
            margin="normal"
            id="telephonenumber"
            label="Telephone Number"
            helperText="Ex:04652-222222"
            fullWidth
            autoComplete="Telephone-number"
          />
        </Grid>
        <Grid item xs={12} md={12}>
        <TextField
            variant="outlined"
            margin="normal"
            id="email"
            label="Email-Address"
            fullWidth
            autoComplete="Email-address"
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