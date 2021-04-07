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
            placeholder="Whatsapp Number"
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
            placeholder="Facebook ID"
            label="Facebook ID"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}  
          />
          <TextField            
            variant="outlined"
            margin="normal"
            id="instagram"
            name="instagram"
            value={data.instagram}
            onChange={onChange}
            placeholder="Instagram ID"
            label="Instagram ID"
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
            placeholder="Twitter Handle"
            label="Twitter Handle"
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
            label="YouTube URL"
            placeholder="YouTube URL"
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
            placeholder="LinkedIn URL"
            label="LinkedIn URL"
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
            placeholder="Website"
            label="Website"
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