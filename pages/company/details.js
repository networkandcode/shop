import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

export default function Details() {
  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  return (
    <React.Fragment>
      <Container maxWidth="sm">
      <Typography variant="h6" gutterBottom>
         Company Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            variant="outlined"
            margin="normal"
            id="companyname"
            name="companyname"
            label="Company Name"
            fullWidth
            autoComplete="given-name"
            autoFocus
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            variant="outlined"
            margin="normal"
            id="companydescription"
            name="companydescription"
            label="Company Description"
            fullWidth
            autoComplete="Company-Description"
          />
        </Grid>
        <Grid item xs={12}>
        <TextField
        variant="outlined"
        margin="normal"
        id="date"
        label="Established Year"
        type="date"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
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
