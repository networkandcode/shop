import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Details from './details';
import Contact from './contact';
import Addbranch from './addbranch';
import Social from  './social';
import Image from './image';
import Workinghour from './workinghours';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://marebox.com/">
        Marebox
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



const steps = ['Details', 'Contact Information', 'Address', 'Social Links','Images', 'Working Hours'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <Details />;
    case 1:
      return <Contact />;
    case 2:
      return <Addbranch />;
    case 3:
      return <Social />;
    case 4:
      return <Image />;
    case 5:
      return <Workinghour />    
    default:
      throw new Error('Unknown step');
  }
}

export default function Profile() {
  
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="absolute" color="default">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Company Profile
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <Paper>
          <Typography component="h1" variant="h4" align="center">
            Company Details
          </Typography>
          <Stepper activeStep={activeStep}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your submission.
                </Typography>
                <Button variant="contained">
                      <Link href="/">Home</Link>
                    </Button>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} color="primary">
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
              
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
  );
}