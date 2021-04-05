import {
    Button,
    Container,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField
  } from '@material-ui/core';
  import axios from 'axios';
  import { useEffect, useState } from 'react';
  import { useRouter } from 'next/router';
  import { useAuth } from '../../hooks/useAuth';
  import Status from '../../components/Status';
  import UserLinks from '../../components/UserLinks';
  
  const Address = () => {
    const router = useRouter();
    const auth = useAuth();
    const [data, setData] = useState({
        address: '',
        pinCode: '',        
        poName: '',
        poNames: [],
        district: '',
        state: '',
        country: 'India',    
    });    
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({        
        message: '',
        error: '',
    });
    const [getDisabled, setGetDisabled] = useState(true);
    const onChange = e => {
        e.preventDefault();        
        const {name, value} = e.target;
        setData({...data, [name]: value});
        setLoading(false);
        setStatus({message: '', error: ''});
        if(data.pinCode && data.pinCode.length >= 5){
            setGetDisabled(false);
        }else{
            setGetDisabled(true);
        }
    }
    const refreshLocation = async() => {
        setLoading(true);
        const res = await axios.get(`https://api.postalpincode.in/pincode/${data.pinCode}`)
        if(res.status === 200){   
            if(res.data[0].Status === 'Success'){
                setData({...data, poNames: res.data[0].PostOffice.map(i => i.Name )});                
                setStatus({...status, ['message']: res.data[0].Message});
            } else{
                setData({...data, poNames: [] });                
                setStatus({...status, ['error']: res.data[0].Message});
            }            
        }
        setLoading(false);
    }
    const getLocation = (e) => {
        e.preventDefault();
        refreshLocation();
    }
    const onChangePoName = async(e) => {
        e.preventDefault();
        const {name, value} = e.target;            
        setLoading(true);
        const res = await axios.get(`https://api.postalpincode.in/postoffice/${value}`);
        if(res.status === 200){                
            if(res.data[0].Status === "Success"){
                const district = res.data[0].PostOffice[0].District;                                
                const state = res.data[0].PostOffice[0].State;                
                setData(prevState => ({...prevState, [name]: value, district: district, ['state']: state}));
                setStatus({...status, message: '', error: ''});
            } else{
                setData(prevState => ({...prevState, [name]: value}));
                setStatus({...status, message: '', ['error']: res.data[0].Message});
            }
        }
        setLoading(false);
    }
    const onSubmit = async(e) => {
      e.preventDefault();
      setLoading(true);
      await auth.updateProfile(data).then(response => {   
        response.error 
          ? setStatus({...status, ['error']: response.error.message})
          : setStatus({...status, ['message']: response});
      })
      setLoading(false);
    }
    useEffect(() => {
      if(!auth.userAuthData){
        router.push('/user/auth');
      } else{
        setData({...data, ...auth.userDoc});        
      }
    }, [auth, router]);
    
    return (
      auth.userAuthData ? (
        <Container maxWidth="xs">
          <UserLinks address="#042F59"/>
          <form onSubmit={onSubmit}>
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
                margin="normal"
                onClick={getLocation}
                variant="contained"
            >
                Get
            </Button>           
            <FormControl fullWidth margin="normal">
              <InputLabel id="poNameLabel">P.O. Name</InputLabel>
              <Select 
                id="poNameSelect" 
                labelId="poNameLabel" 
                name="poName"
                onChange={onChangePoName}
                size={data.poNames.length}             
                value={data.poName || ''}
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
            <Status loading={loading} status={status}/>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
            >
              Save
            </Button>            
          </form>
        </Container>
      ) : (
        <p>Redirecting...</p>
      )
    )
  }
  
  export default Address;