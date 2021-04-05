import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { useRequireAuth } from '../../hooks/useRequireAuth';
import Status from '../../components/Status';
import UserLinks from '../../components/UserLinks';

export default function Social() {
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
      setData({...data, ...auth.userDoc});        
    }
  }, [auth, router]);

  return (
    <>
      <Container maxWidth="xs">
        <UserLinks social="#042F59"/>
          <form onSubmit={onSubmit}>
          <TextField            
            variant="outlined"
            margin="normal"
            id="whatsapp"
            onChange={onChange}
            name="whatsapp"
            value={data.whatsapp}
            label="Whatsapp Number"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}  
          />
          <TextField
            variant="outlined"
            margin="normal"
            id="facebook"
            name="facebook"
            value={data.facebook}
            onChange={onChange}
            label="Facebook"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}  
          />
          <TextField            
            variant="outlined"
            margin="normal"
            id="twitter"
            name="twitter"
            value={data.twitter}
            onChange={onChange}
            label="Twitter"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}  
          />
          <TextField            
            variant="outlined"
            margin="normal"
            id="youtube"
            name="youtube"
            value={data.youtube}
            onChange={onChange}
            label="Youtube"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}  
          />        
          <TextField            
            variant="outlined"
            margin="normal"
            id="linkedin"
            name="linkedin"
            value={data.linkedin}
            onChange={onChange}
            label="LinkedIn"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}  
          />
          <TextField            
            variant="outlined"
            margin="normal"
            id="website"
            name="website"
            value={data.website}
            onChange={onChange}
            label="website"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}  
          />
          <Button
            type="submit"
            fullWidth
            margin="normal"
            variant="contained"
            color="primary"
          >
            Submit
          </Button>    
          <Status status={status}/>
        </form>          
      </Container>
    </>
  );
}