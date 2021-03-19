import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AddAPhotoRoundedIcon from '@material-ui/icons/AddAPhotoRounded';
import Avatar from '@material-ui/core/Avatar';
import CreateNewFolderRoundedIcon from '@material-ui/icons/CreateNewFolderRounded';

export default function Image() {
  
  return (
    <React.Fragment>
      <Typography variant="h6">
         Upload Images
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
        <h3>Banner Image</h3>
        <Avatar>
        <AddAPhotoRoundedIcon />
      </Avatar>
        </Grid>
        <Grid item xs={12} sm={12}>
        <h3>Gallery Images</h3>
        <Avatar>
        <AddAPhotoRoundedIcon />
      </Avatar>
        </Grid>
        <Grid item xs={12} sm={12}>
        <h3>Brochure Upload</h3>
        <Avatar>
        <CreateNewFolderRoundedIcon />
      </Avatar>
        </Grid>
              </Grid>
    </React.Fragment>
  );
}
