import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from '@material-ui/pickers';

export default function Workinghour() {
  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  return (
    <React.Fragment>
      <Container maxWidth="sm">
      <Typography variant="h6" gutterBottom>
         Working Hours
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={4}>
          <h3>Monday</h3>
        </Grid>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid item xs={4} sm={4}>
        <KeyboardTimePicker
          required
          margin="normal"
          id="time-picker"
          label="From"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
        </Grid>
        </MuiPickersUtilsProvider>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid item xs={4} sm={4}>
        <KeyboardTimePicker
          required
          margin="normal"
          id="time-picker"
          label="To"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
        </Grid>
        </MuiPickersUtilsProvider>
        <Grid item xs={4} sm={4}>
          <h3>Tuesday</h3>
        </Grid>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid item xs={4} sm={4}>
        <KeyboardTimePicker
          required
          margin="normal"
          id="time-picker"
          label="From"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
        </Grid>
        </MuiPickersUtilsProvider>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid item xs={4} sm={4}>
        <KeyboardTimePicker
          required
          margin="normal"
          id="time-picker"
          label="To"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
        </Grid>
        </MuiPickersUtilsProvider>
        <Grid item xs={4} sm={4}>
          <h3>Wednesday</h3>
        </Grid>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid item xs={4} sm={4}>
        <KeyboardTimePicker
          required
          margin="normal"
          id="time-picker"
          label="From"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
        </Grid>
        </MuiPickersUtilsProvider>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid item xs={4} sm={4}>
        <KeyboardTimePicker
          required
          margin="normal"
          id="time-picker"
          label="To"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
        </Grid>
        </MuiPickersUtilsProvider>
        <Grid item xs={4} sm={4}>
          <h3>Thursday</h3>
        </Grid>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid item xs={4} sm={4}>
        <KeyboardTimePicker
          required
          margin="normal"
          id="time-picker"
          label="From"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
        </Grid>
        </MuiPickersUtilsProvider>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid item xs={4} sm={4}>
        <KeyboardTimePicker
          required
          margin="normal"
          id="time-picker"
          label="To"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
        </Grid>
        </MuiPickersUtilsProvider>
        <Grid item xs={4} sm={4}>
          <h3>Friday</h3>
        </Grid>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid item xs={4} sm={4}>
        <KeyboardTimePicker
          required
          margin="normal"
          id="time-picker"
          label="From"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
        </Grid>
        </MuiPickersUtilsProvider>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid item xs={4} sm={4}>
        <KeyboardTimePicker
          required
          margin="normal"
          id="time-picker"
          label="To"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
        </Grid>
        </MuiPickersUtilsProvider>
        <Grid item xs={4} sm={4}>
          <h3>Saturday</h3>
        </Grid>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid item xs={4} sm={4}>
        <KeyboardTimePicker
          required
          margin="normal"
          id="time-picker"
          label="From"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
        </Grid>
        </MuiPickersUtilsProvider>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid item xs={4} sm={4}>
        <KeyboardTimePicker
          required
          margin="normal"
          id="time-picker"
          label="To"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
        </Grid>
        </MuiPickersUtilsProvider>
        <Grid item xs={4} sm={4}>
          <h3>Sunday</h3>
        </Grid>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid item xs={4} sm={4}>
        <KeyboardTimePicker
          required
          margin="normal"
          id="time-picker"
          label="From"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
        </Grid>
        </MuiPickersUtilsProvider>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid item xs={4} sm={4}>
        <KeyboardTimePicker
          required
          margin="normal"
          id="time-picker"
          label="To"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
        </Grid>
        </MuiPickersUtilsProvider>
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