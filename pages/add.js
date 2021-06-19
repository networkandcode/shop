import {
    Button,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Select,  
    TextField
} from '@material-ui/core';
import axios from 'axios';
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
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({
      message: '',
      error: ''
    })
    const [categories, setCategories] = useState([])

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
        const fileRef = storageRef.child(`${item.category}/${item.name}/${item.imgFile.name}`);
        const imgURL = await fileRef.put(item.imgFile).then(async()=>(await fileRef.getDownloadURL()))
        console.log(imgURL);
        addItemToDB(imgURL);
    }
    const addItemToDB = async(imgURL) => {
        if (imgURL){
            const record = {...item, imgURL};
            await axios.post("/api/db", { operation: 'insert', record, table: 'items' })
                .then(result => {
                  if(result.data.error){
                        setStatus({ ...status, ['error']: result.data.error });
                    } else{
                        setStatus({ ...status, ['message']: result.data.message });
                        auth.addItem(record);
                    }
                });
        }
        setLoading(false);
        setItem({});
    }
    useEffect(() => {
      if(!auth.userAuthData){
        router.push('/signin');
      } else{
        var temp = [];
        auth.categories.forEach(i => {
            temp.push(i.name);
            if(i.categories){
                i.categories.forEach(j => {
                    temp.push(`${i.name}/${j.name}`)
                });
            }
        });
        setCategories([...temp]);
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
                {categories.map (category => (
                    <MenuItem value={category}>{category.replace('/', ' >> ')}</MenuItem>
                ))}
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
