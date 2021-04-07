import {
  Button,
  Chip,
  Container,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,  
  TextField
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { useRequireAuth } from '../../hooks/useRequireAuth';
import Status from '../../components/Status';
import UserLinks from '../../components/UserLinks';

const Profile = () => {
  const router = useRouter();
  const auth = useRequireAuth();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({    
    message: '',
    error: ''
  })
  const onChange = e => {
    const {name, value} = e.target;
    setData({...data, [name]: value });
    setLoading(false);
    setStatus({
      message: '',
      error: ''
    });
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
      auth.getCategories();
      setData({...data, ...auth.userDoc});
    }
  }, [auth, router]);
  
  return (
    auth.userAuthData ? (
      <Container maxWidth="xs">
        <UserLinks profile="#042F59"/>
        <form onSubmit={onSubmit}>
          <TextField
            autoComplete="given-name"
            id="displayName"     
            InputLabelProps={{
              shrink: true,
            }}  
            label="Contact Person"       
            margin="normal"
            name="displayName"
            onChange={onChange}
            placeholder="Contact Person"        
            value={data.displayName || ''}
            variant="outlined"
            fullWidth
          />
          <TextField
            autoComplete="Phone-number"
            fullWidth
            helperText="Ex: +91-9999999999"
            id="phoneNumber"      
            InputLabelProps={{
              shrink: true,
            }}
            label="Phone Number"                  
            margin="normal"
            name="phoneNumber"
            onChange={onChange}
            placeholder="Phone Number"
            required
            type="number"
            value={data.phoneNumber || ''}
            variant="outlined"          
          />
          <TextField
            autoComplete="altPhNo"
            fullWidth
            helperText=""
            id="altPhNo"      
            InputLabelProps={{
              shrink: true,
            }}
            label="Alternate phone number"                  
            margin="normal"
            name="altPhNo"
            onChange={onChange}
            placeholder="Alternate phone number"
            type="number"
            value={data.altPhNo || ''}
            variant="outlined"          
          />
          <TextField
            autoComplete="companyName"
            fullWidth
            helperText=""
            id="companyName"      
            InputLabelProps={{
              shrink: true,
            }}
            label="Company Name"                  
            margin="normal"
            name="companyName"
            onChange={onChange}
            placeholder="Company Name"
            required
            type="text"
            value={data.companyName || ''}
            variant="outlined"          
          />
          <TextField
            autoComplete="establishedYear"
            fullWidth
            helperText=""
            id="establishedYear"      
            InputLabelProps={{
              shrink: true,
            }}
            label="Established Year"                  
            margin="normal"
            name="establishedYear"
            onChange={onChange}
            placeholder="Established Year"
            type="date"
            value={data.establishedYear || ''}
            variant="outlined"          
          />
          <TextField
            autoComplete="companyDescription"
            fullWidth
            helperText=""
            id="companyDescription"      
            InputLabelProps={{
              shrink: true,
            }}
            label="About"                  
            margin="normal"
            multiline
            name="companyDescription"
            onChange={onChange}
            placeholder="About your company"
            type="text"
            value={data.companyDescription || ''}
            variant="outlined"        
          />
          <FormControl fullWidth margin="normal" required>
            <InputLabel id="businessTypeLabel">Business Type</InputLabel>
            <Select               
              id="businessTypeSelect" 
              labelId="businessTypeLabel"               
              name="businessType"
              onChange={onChange}
              value={data.businessType || ''}              
            >
              <MenuItem value="Product">Product</MenuItem>
              <MenuItem value="Service">Service</MenuItem>
              <MenuItem value="Product and Service">Product and Service</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal" required>
            <InputLabel id="businessCategoriesLabel">Business Categories</InputLabel>
            <Select 
              id="businessCategoriesSelect" 
              labelId="businessCategoriesLabel"              
              multiple
              name="businessCategories"
              onChange={onChange}              
              renderValue={(selected) => (
                <div>
                  {selected.map((value) => (
                    <Chip key={value} label={value}/>
                  ))}
                </div>
              )}
              size = {auth.categories.length}
              value={data.businessCategories || []}
            >
              {auth.categories && auth.categories.map( (category, idx) => (
                <MenuItem key={idx} value={category}>                  
                  <ListItemText primary={category}/>
                </MenuItem>
              ))}              
            </Select>
          </FormControl>
          <Status loading={loading} status={status}/>
          <Button
              color="primary"
              fullWidth
              margin="normal"
              type="submit"
              variant="contained"              
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

export default Profile;