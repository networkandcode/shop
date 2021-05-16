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
import { useEffect, useRef, useState } from 'react';
import Status from '../components/Status'; 
import { useAuth } from '../hooks/useAuth';

const Add = () => {
    const inputEl = useRef(null);                                                                                                                                                                                                                                                                                                                                                                                                                                                             
    const router = useRouter();
    const auth = useAuth();
    const [item, setItem] = useState({});
    const [imgURL, setImgURL] = useState('');
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
        const { name, value } = e.target;
        e.preventDefault();
        setItem({...item, imgFile: inputEl.current.files[0].name})
    }
    const onSubmit = async(e) => {
        e.preventDefault();
        setStatus({});
        setLoading(true);
        const fileRef = firebase.storage().ref(`${item.category}/${item.name}/` + item.imgFile)
        await fileRef.put(item.imgFile)
        const fileURL = await fileRef.getDownloadURL()
        await auth.addItem(item, fileURL).then(response => {   
            response.error 
              ? setStatus({...status, ['error']: response.error.message})
              : setStatus({...status, ['message']: response});
        })
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
          <form onSubmit={onSubmit}>
            <TextField
              autoComplete="name"
              id="name"     
              InputLabelProps={{
                shrink: true,
              }}  
              label="Name of the Item"       
              margin="normal"
              name="name"
              onChange={onChange}
              placeholder="Name of the Item"  
              required      
              value={item.name || ''}
              variant="outlined"
              fullWidth
            />
            <TextField
              autoComplete="description"
              fullWidth
              helperText=""
              id="description"      
              InputLabelProps={{
                shrink: true,
              }}
              label="Description of the Item"                  
              margin="normal"
              multiline
              name="description"
              onChange={onChange}
              placeholder="Description of the Item"            
              value={item.description || ''}
              variant="outlined"          
            />          
            <FormControl fullWidth margin="normal" required>
              <InputLabel id="categoryLabel">Category</InputLabel>
              <Select               
                id="categorySelect" 
                labelId="categoryLabel"               
                name="category"
                onChange={onChange}
                required
                value={item.category || ''}              
              >
                <MenuItem value="Clothing">Clothing</MenuItem>
                <MenuItem value="Household">Household</MenuItem>
                <MenuItem value="Accessories">Accessories</MenuItem>
              </Select>
            </FormControl>
            <TextField
              autoComplete="price"
              fullWidth
              helperText=""
              id="price"      
              InputLabelProps={{
                shrink: true,
              }}
              label="Price in Rupee"                  
              margin="normal"
              name="price"
              onChange={onChange}
              placeholder="Price in Rupee"            
              required
              type="number"
              value={item.price || ''}
              variant="outlined"          
            />             
            <small>
              Upload Image <br/>
            </small>
            <input
              accept="image/png, image/jpeg"            
              label="Upload Image"
              name="imgFile"      
              onChange={onChgImg}
              placeholder="Upload Image"   
              ref={inputEl}         
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
