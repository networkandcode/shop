import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


export default function Branch() {

  return (
    <React.Fragment>
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            variant="outlined"
            margin="normal"
            id="BranchName"
            name="branchname"
            label="Branch Name"
            fullWidth
            autoComplete="Branch-Name"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            variant="outlined"
            margin="normal"
            id="AddressLine"
            name="addressline"
            label="Address Line"
            fullWidth
            autoComplete="Address-Line"
          />
        </Grid>
        <Grid item xs={12}>

        <FormControl variant="outlined" fullWidth>
        <InputLabel variant="outlined" >Area</InputLabel>
        <Select variant="outlined" label="Area">
          
        </Select>
      </FormControl>
      </Grid>
        
      <Grid item xs={6}>
          <TextField
            required
            variant="outlined"
            margin="normal"
            id="subdistrict"
            name="subdistrict"
            label="Sub District"
            fullWidth
            autoComplete="sub-district"
          />
        </Grid>
       <Grid item xs={6}>
          <TextField
            required
            variant="outlined"
            margin="normal"
            id="district"
            name="district"
            label="District"
            fullWidth
            autoComplete="district"
          />
        </Grid>
       <Grid item xs={6}>
          <TextField
            required
            variant="outlined"
            margin="normal"
            id="state"
            name="state"
            label="State"
            fullWidth
            autoComplete="state"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            variant="outlined"
            margin="normal"
            id="pincode"
            name="pincode"
            label="Pincode"
            fullWidth
            autoComplete="pincode"
          />
        </Grid>
        
              </Grid>
    </React.Fragment>
  );
}
