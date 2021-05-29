import {
    Button,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Select,  
    TextField
} from '@material-ui/core';
import firebase from 'firebase';
import 'firebase/storage';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Status from '../components/Status'; 
import { useAuth } from '../hooks/useAuth';

const Add = () => {
    const router = useRouter();
    const auth = useAuth();
    const [item, setItem] = useState({});
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({    
      message: '',
      error: ''
    })
    const onChange = e => {  
      const {name, value} = e.target;  
      setItem({...item, [name]: value });
      setLoading(false);
      setStatus({
        message: '',
        error: ''
      });
    }
    const onChgImg = (e) => {
        e.preventDefault();
        setItem({...item, imgFile: e.target.files[0]});
    }
    const onSubmit = async(e) => {
        e.preventDefault();
        // clear status and show waiting
        setStatus({});
        setLoading(true);
        // upload image to storage
        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child(`${item.category}/${item.imgFile.name}`);
        const imgURL = await fileRef.put(item.imgFile).then(async()=>(await fileRef.getDownloadURL()))
        console.log(imgURL);
        addCategoryToDB(imgURL);
    }
    const addCategoryToDB = async(imgURL) => {
        if (imgURL){
          await auth.addCategory(item, imgURL).then(response => {   
              response.error 
                ? setStatus({...status, ['error']: response.error.message})
                : setStatus({...status, ['message']: response});
          })
        }
        setLoading(false);
        setItem({});
    }
    useEffect(() => {      
      if(!auth.userAuthData){        
        router.push('/signin');
      }
    },[auth, router]);
    
    return (

        <Container maxWidth="xs">      
          <br/>
          <form onSubmit={onSubmit}>
            <TextField
              autoComplete="name"
              id="name"     
              InputLabelProps={{
                shrink: true,
              }}  
              label="Name of the Category"       
              margin="normal"
              name="name"
              onChange={onChange}
              placeholder="Name of the Category"  
              required      
              value={item.name || ''}
              variant="outlined"
              fullWidth
            />
            <small>
              Upload Image <br/>
            </small>
            <input
              accept="image/png, image/jpeg"            
              label="Upload Image"
              onChange={onChgImg}
              placeholder="Upload Image"   
              required
              type="file"
            />
            <br/>            
            <Status loading={loading} status={status}/>
            <br/>          
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
      )
}

export default Add
