import {
    Button,
    Container,
    FormControl,
    Grid,
    InputLabel,
    Select,
    MenuItem,
    Typography,
    TextField
  } from '@material-ui/core';
  import axios from 'axios';
  import { useEffect, useState } from 'react';
  import { useRouter } from 'next/router';
  import { useAuth } from '../../hooks/useAuth';
  
  const Address = () => {
    const router = useRouter();
    const auth = useAuth();
    const [data, setData] = useState({
        address: '',
        pinCode: '',
        poNames: [],
        poName: [],
        district: '',
        state: '',
        country: '',        
    });
    const [status, setStatus] = useState({
        isLoading: false,
        message: '',
        error: '',
    });
    const [getDisabled, setGetDisabled] = useState(true);
    const onChange = e => {
        e.preventDefault();        
        const {name, value} = e.target;
        setData({...data, poName: [], [name]: value});
        setStatus({isLoading: false, message: '', error: ''});
        if(data.pinCode && data.pinCode.length >= 5){
            setGetDisabled(false);
        }else{
            setGetDisabled(true);
        }
    }
    const getLocation = async(e) => {
        e.preventDefault();            
        setStatus({...status, isLoading: true, message: '', error: ''});
        const res = await axios.get(`https://api.postalpincode.in/pincode/${data.pinCode}`)
        if(res.status === 200){   
            if(res.data[0].Status === 'Success'){
                const poNames = res.data[0].PostOffice.map(i => [ i.Name ]);
                setData({...data, ['poNames']: poNames});
                setStatus({...status, isLoading: false, ['message']: res.data[0].Message});
            } else{
                setData({...data, poNames: []});
                setStatus({...status, isLoading: false, ['error']: res.data[0].Message});
            }            
        } 
    }
    const onChangePoName = async(e) => {
        e.preventDefault();
        const {name, value} = e.target;             
        setStatus({...status, isLoading: true});
        const res = await axios.get(`https://api.postalpincode.in/postoffice/${value[0]}`);
        if(res.status === 200){                
            if(res.data[0].Status === "Success"){
                const district = res.data[0].PostOffice[0].District;                                
                const state = res.data[0].PostOffice[0].State;                
                setData(prevState => ({...prevState, [name]: value, district: district, ['state']: state}));
                setStatus({...status, isLoading: false, message: '', error: ''});
            } else{
                setData(prevState => ({...prevState, [name]: value}));
                setStatus({...status, isLoading: false, message: '', ['error']: res.data[0].Message});
            }
        }
    }
    const onSubmit = async(e) => {
        e.preventDefault(); 
        const {displayName, phoneNumber} = data;
        await auth.updateProfile(data).then(response => {   
          response.error 
            ? setData({...data, ['error']: response.error.message})
            : setData({...data, ['message']: response.error.message});
        })
    }
    useEffect(() => {
      if(!auth.userAuthData){
        router.push('/auth');
      } else{
        const {displayName} = auth.userAuthData;
        setData({...data, displayName});
      }
    }, [auth, router]);
    return (
      auth.userAuthData ? (
        <Container maxWidth="xs" spacing={2}>
          <Typography variant="h6" gutterBottom>
            Address
          </Typography>
          <form onSubmit={onSubmit}>
          <Grid container spacing={2} style={margin: `2px`}>
            <TextField
              autoComplete="address"
              fullWidth              
              helperText=""
              id="address"      
              InputLabelProps={{                
                shrink: true
              }}
              label="Address"                  
              margin="normal"
              multiline
              name="address"
              onChange={onChange}
              placeholder="Address"            
              value={data.address}
              variant="outlined"         
            />
            <TextField
              autoComplete="pinCode"
              fullWidth              
              helperText="Ex. 629001"
              id="pinCode"      
              InputLabelProps={{
                maxLength: 6,
                shrink: true,
              }}
              label="PIN Code"                  
              margin="normal"
              name="pinCode"
              onChange={onChange}
              placeholder="PIN Code"            
              value={data.pinCode || ''}
              variant="outlined"         
            />
            <Button               
                color="primary"
                disabled={getDisabled}
                fullWidth
                onClick={getLocation}
                variant="contained"
            >
                Get
            </Button>
            </Grid>
            <Grid container spacing={2}>
            <FormControl fullWidth>
              <InputLabel id="poNameLabel">P.O. Name</InputLabel>
              <Select 
                id="poNameSelect" 
                labelId="poNameLabel" 
                name="poName"
                onChange={onChangePoName}             
                value={data.poName}
              >
                {data.poNames && data.poNames.map( (poName, idx) => (
                  <MenuItem key={idx} value={poName}>{poName}</MenuItem>
                ))}              
              </Select>
            </FormControl>
            <TextField
              autoComplete="district"
              disabled
              fullWidth
              helperText=""
              id="district"      
              InputLabelProps={{
                readOnly: true,
                shrink: true,
              }}
              label="District"                  
              margin="normal"
              name="district"          
              placeholder="District"
              type="text"
              value={data.district || ''}
              variant="outlined"         
            />
            <TextField
              autoComplete="state"
              disabled
              fullWidth
              helperText=""
              id="state"      
              InputLabelProps={{
                readOnly: true,
                shrink: true,
              }}
              label="State"                  
              margin="normal"
              name="state"          
              placeholder="State"
              type="text"
              value={data.state || ''}
              variant="outlined"         
            />
            <TextField
              autoComplete="country"
              disabled
              fullWidth
              helperText=""
              id="country"      
              InputLabelProps={{
                readOnly: true,
                shrink: true,
              }}
              label="Country"                  
              margin="normal"
              name="country"          
              placeholder="Country"
              type="text"
              value="India"
              variant="outlined"         
            />
            {status.isLoading && (<p style={{color: "orange"}}>Please wait...</p>)}
            {status.message && (<p style={{color: "green"}}>{status.message}</p>)}
            {status.error && (
                <p style={{color: "red"}}>{status.error}</p>
            )}
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
            >
              Save
            </Button>
            </Grid>
          </form>
        </Container>
      ) : (
        <p>Redirecting...</p>
      )
    )
  }
  
  export default Address;