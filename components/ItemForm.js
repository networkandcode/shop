import ItemAttributes from '../components/ItemAttributes';
import Status from '../components/Status';
import { useAuth } from '../hooks/useAuth';
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

const ItemForm = (props) => {
    const inputEl = useRef(null);
    const router = useRouter();
    const state = useAuth();
    const [item, setItem] = useState(props.item);
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

    const onChangeAttributes = attributes => {
        setItem({...item, attributes});
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
        var imgURL;
        if(item.imgFile){
            const fileRef = storageRef.child(`${item.category}/${item.name}/${item.imgFile.name}`);
            imgURL = await fileRef.put(item.imgFile).then(async()=>(await fileRef.getDownloadURL()))
        }
        addItemToDB(imgURL);
    }

    const addItemToDB = async(imgURL) => {
        console.log(item);
        if (imgURL){
            var operation;
            var record = {...item, imgURL};

            console.log(props);

            if(props.isNewItem) {
                operation = 'insert';
            } else{
                operation = 'update';
            }

            await axios.post("/api/db", { operation, record, table: 'items' })
                .then(res => {
                    if(res.data.error){
                        setStatus({ ...status, ['error']: res.data.error });
                    } else{
                        record = { ...record, id: res.data.id };
                        setStatus({ ...status, ['message']: res.data.message });
                        state.addItem(record);

                        // if its a new item, clear the form, after adding
                        if(props.isNewItem){
                            setItem({})
                        }
                    }
                });
        }
        setLoading(false);
    }

    useEffect(() => {
      if(!state.userAuthData){
        router.push('/signin');
      } else{
          var temp = [];
          state.categories.forEach(i => {
              temp.push(i);
          });
          setCategories([...temp]);
      }
    },[state, router]);

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
                    <MenuItem
                        key={category.id}
                        value={category.name}
                    >
                        { category.name.split('/').join(' >> ') }
                    </MenuItem>
                ))}
              </Select>
            </FormControl>
            {item.category && <ItemAttributes item={item} onChangeAttributes={onChangeAttributes}/>}
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

export default ItemForm;
